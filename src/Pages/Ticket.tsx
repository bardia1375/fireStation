import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams, RouteComponentProps } from "react-router-dom";
import RecorderControls from "../Components/recorder-controls/index";
import RecordingsList from "../Components/recordings-list/index";
import useRecorder from "../hooks/useRecorder";
import {
  createNewMessage,
  deleteMessageById,
  getFileByMessageId,
  getTicketById,
  getVoiceFileByMessageId,
  sendMessage,
} from "../Actions/Ticket/ticket";
import { setIsLoading } from "../Actions/Loading/loading";
import Waveform from "./Waveform";
import useRecordingsList from "../hooks/use-recordings-list";
import { convertEnglishNumberToPersian } from "../Utils/commonFunctions";
import DeleteModal from "../Components/Commons/DeleteModal";
import Blur from "../Components/Commons/Blur";
import TicketMessageTitle from "../Components/TicketMessage/TicketMessageTitle";
import TicketMessage from "../Components/TicketMessage/TicketMessage";
import TicketMessageFooter from "../Components/TicketMessage/TicketMessageFooter";

interface ReplyMessage {
  text: string;
  department: string;
  user: string;
}

interface FileMessage {
  files: File[];
  fileType: number;
}

interface VoiceSrcData {
  messageId: number;
  src: string;
  link: string;
}

interface VoiceSrc {
  data: VoiceSrcData[];
  len: number;
}

interface ImageSrc {
  messageId: number;
  src?: string;
  size?: number;
}

interface NewMessage {
  text: string;
  file: FileMessage;
  ticketId: string;
}

interface DeleteModalState {
  isOpen: boolean;
  id: number;
  type: number;
}

interface MessageOptionState {
  messageId: number;
  isEnable: boolean;
  type: number;
}

interface TicketProps extends RouteComponentProps<{ id: string }> {
  location: {
    state: {
      state: number;
    };
  };
}

const MAX_TEXT_LENGTH = 1500;

const Ticket: React.FC<TicketProps> = ({ location, match }) => {
  const dispatch = useDispatch();
  let cleanUp = useRef(false);
  const { recorderState, ...handlers } = useRecorder();
  const { startRecording, saveRecording, cancelRecording, pauseRecording, resumeRecording } =
    handlers;

  const { audio, src, isRecording } = recorderState;
  const { recordings, deleteAudio } = useRecordingsList(audio, src);
  const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<any[]>([]);
  console.log("stateticket", ticket);

  const [isDeleting, setIsDeleting] = useState(false);
  const [ReplyMessage, setReplyMessage] = useState<ReplyMessage>({
    text: "",
    department: "",
    user: "",
  });
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<DeleteModalState>({
    isOpen: false,
    id: -1,
    type: -1,
  });
  const [messageType, setMessageType] = useState("none");
  const [isMessageOptionEnable, setIsMessageOptionEnable] = useState<MessageOptionState>({
    messageId: -1,
    isEnable: false,
    type: -1,
  });
  const [newMessage, setNewMessage] = useState<NewMessage>({
    text: "",
    file: { files: [], fileType: 0 },
    ticketId: id,
  });
  const [imagesSrc, setImagesSrc] = useState<ImageSrc[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [loadedFilePercent, setLoaded] = useState(0);
  const [loadedVoicePercent, setVoiceLoaded] = useState(0);
  const [voiceSrc, setVoiceSrc] = useState<VoiceSrc>({
    data: [],
    len: -1,
  });

  const { text } = newMessage;

  const handleGetMyTicket = async (id: string) => {
    dispatch(setIsLoading(true));
    const { tickets } = await getTicketById(id);
    if (tickets) {
      dispatch(setIsLoading(false));
    }
    console.log("ticketstickets", tickets);
    const bardia = {
      ...tickets,
      Messages: [
        {
          Note: tickets?.Description,
          Username: "crm admin",
          FileContent: null,
          MimeType: null,
        },
        ...tickets?.Messages,
      ],
    };
    console.log("bardia", bardia);

    setTicket({
      ...tickets,
      Messages: [
        {
          Note: tickets?.Description,
          Username: "crm admin",
          FileContent: null,
          MimeType: null,
        },
        ...tickets?.Messages,
      ],
    });
  };

  const handleDownloadImage = async (id: number) => {
    let newDta = imagesSrc.find(img => img.messageId === id);
    let data = "";
    if (typeof newDta === "undefined") {
      data = await getFileByMessageId(id);

      setImagesSrc(prev => [...prev, { messageId: id, src: data.data, size: data.size }]);
    }
  };

  const handleDownloadFile = async (id: number) => {
    let newDta = imagesSrc.find(img => img.messageId === id);
    let data = "";
    if (typeof newDta === "undefined") {
      setImagesSrc(prev => [...prev, { messageId: id }]);
      data = await getFileByMessageId(id);

      setImagesSrc(prev => [
        ...prev.filter(file => file.messageId !== id),
        {
          messageId: id,
          src: data.data,
          size: data.size,
        },
      ]);
    }
  };

  const handleChoselogo = (ext: string, link: string) => {
    let src = null;
    if (ext === "jpg" || ext === "png") {
      src = link;
    } else if (ext === "txt") {
      src = "/images/text-logo.png";
    } else if (ext === "pdf") {
      src = "/images/pdf-logo.png";
    } else if (ext === "xlsx") {
      src = "/images/exel-logo.png";
    } else if (ext === "docx") {
      src = "/images/word-logo.png";
    }

    return src;
  };

  const handleDownloadVoiceFile = async (id: number, len: number) => {
    let file = "";
    let newDta = voiceSrc.data.find(voice => voice.messageId === id);
    if (typeof newDta === "undefined") {
      file = await getVoiceFileByMessageId(id);
      setVoiceSrc(prev => ({
        data: [
          ...prev.data,
          {
            messageId: id,
            src: `data:audio/mp3;base64,${file.voice.split(",")[1]}`,
            link: `data:audio/octet-stream;base64,${file.voice.split(",")[1]}`,
          },
        ],
        len,
      }));
    }
  };

  const [base64String, setBase64String] = useState("");

  const handleUploadFile = async (data: File, type: string, handleReset: () => void) => {
    dispatch(setIsLoading(true));

    if (isSending) {
      return false;
    }
    setIsSending(true);
    if (type === "file") {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64 = reader.result?.toString().split(",")[1];
        const file = {
          TicketId: id,
          Message: data.name,
          FileContent: base64,
          MimeType: data.type,
          FileName: data.name,
        };

        sendMessage(file, ProgressEvent => {
          setLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100);
        }).then(() => handleGetMyTicket(id));
        setLoaded(0);
      };

      reader.readAsDataURL(data);
    }

    if (type === "voice") {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64 = reader.result?.toString().split(",")[1];
        const file = {
          TicketId: id,
          Message: "فایل صوتی",
          FileContent: base64,
          MimeType: data.type,
          FileName: "فایل صوتی",
        };
        sendMessage(file, ProgressEvent => {
          setVoiceLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100);
        }).then(() => handleGetMyTicket(id));
      };
      reader.readAsDataURL(data);

      setVoiceSrc({
        data: [],
        len: -1,
      });
      handleReset();
      setVoiceLoaded(0);
      setMessageType("none");
    }

    setIsSending(false);
  };

  const handleCreateMessage = async () => {
    if (isSending) {
      return false;
    }
    if (newMessage.text.trim()?.length === 0 || newMessage.text?.length >= MAX_TEXT_LENGTH) {
      return false;
    }

    const file = {
      TicketId: newMessage.ticketId,
      Message: newMessage.text,
    };

    await sendMessage(file, ProgressEvent => {
      setLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100);
    });
    setIsSending(true);
    setIsSending(false);
    setNewMessage(prev => ({
      text: "",
      file: { files: [], fileType: 0 },
      ticketId: id,
    }));
    setMessageType("none");
    setReplyMessage({
      text: "",
      department: "",
      user: "",
    });
    handleGetMyTicket(id);
  };

  const handleOpenDeleteModal = (isOpen = false, messageId = -1, type = -1) => {
    setDeleteModalOpen(prev => ({
      ...prev,
      isOpen,
      id: messageId,
      type,
    }));
  };

  const handleDeleteMessage = async () => {
    setIsDeleting(true);
    const message = new FormData();
    message.append("MessageId", isDeleteModalOpen.id);
    await deleteMessageById(message);
    setDeleteModalOpen(prev => ({
      ...prev,
      isOpen: false,
      id: -1,
      type: -1,
    }));
    if (isDeleteModalOpen.type === 2) {
      setVoiceSrc({
        data: [],
        len: -1,
      });
    }
    setIsDeleting(false);
    const { tickets } = await getTicketById(id);

    setTicket(tickets);
  };

  const handleChooseMesageType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageType(e.target.id);
  };

  const handleReplyMessage = (text = "", department = "", user = "") => {
    setReplyMessage(prev => ({
      ...prev,
      text,
      department,
      user,
    }));
    setMessageType("none");
  };

  const handleStartVoice = (e: React.MouseEvent) => {
    if (!isRecording) {
      handleChooseMesageType(e);
      startRecording();
    } else {
      saveRecording();
    }
  };

  const handleSaveRecording = (e: React.MouseEvent) => {
    saveRecording();
  };

  const handleDeleteRecording = (e: React.MouseEvent) => {
    cancelRecording();
    deleteAudio();
  };

  const handlePauseRecording = (e: React.MouseEvent) => {
    pauseRecording();
  };

  const handleResumeRecording = (e: React.MouseEvent) => {
    resumeRecording();
  };

  const handleChangeNewMesssage = (value: string) => {
    if (value?.length <= MAX_TEXT_LENGTH) {
      setNewMessage(prev => ({
        ...prev,
        text: value === "\n" ? prev.text.concat("\n") : value,
      }));
    }
  };

  const lastMessage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handleGetMyTicket(id);
  }, [id]);

  useEffect(() => {
    const refreshData = setInterval(async () => {
      const { tickets } = await getTicketById(id);
      setTicket(tickets);
    }, 120000);

    return () => {
      clearInterval(refreshData);
      handleDeleteRecording();
      setMessageType("none");
      setImagesSrc([]);
      setIsSending(false);
      setLoaded(0);
      setVoiceLoaded(0);

      cleanUp.current = true;
      setVoiceSrc({
        data: [],
        len: -1,
      });
    };
  }, [id]);

  useEffect(() => {
    console.log("ticketticket", ticket);
    cleanUp.current = false;
    if (ticket?.length > 0 && !cleanUp.current) {
      ticket.forEach(item => {
        if (item.Type == 5) {
          handleDownloadImage(item.Id);
        }
        if (item.Type == 2) {
          handleDownloadVoiceFile(item.Id, ticket.filter(t => t.Type == 2)?.length);
        }
        if (item.Type == 1 || true) {
          handleDownloadFile(item.Id);
        }
      });
    }
  }, [id, ticket?.length]);
  const handleMessageOptions = (messageId, type) => {
    setIsMessageOptionEnable(prev => ({
      ...prev,
      messageId,
      isEnable: !prev.isEnable,
      type,
    }));
  };

  const { state } = location;
  useEffect(() => {
    setNewMessage(prev => ({
      text: "",
      file: { files: [], fileType: 0 },
      ticketId: id,
    }));
    setReplyMessage({
      text: "",
      department: "",
      user: "",
    });

    lastMessage.current.scrollTo({
      top: lastMessage.current.scrollHeight,
    });
  }, [lastMessage.current, id, ticket?.length]);
  console.log("ticketticket", ticket);
  console.log("locationlocation", location.state.state);

  return (
    <>
      {isDeleteModalOpen.isOpen && <Blur />}
      {isDeleteModalOpen.isOpen && (
        <DeleteModal
          handleOpenDeleteModal={handleOpenDeleteModal}
          handleDeleteMessage={handleDeleteMessage}
          isDeleting={isDeleting}
        />
      )}

      <div className="ticket">
        <TicketMessageTitle state={state} id={id} RefrenceCode={ticket?.RefrenceCode} />
        <div ref={lastMessage} className="ticket__body_container">
          <div className="ticket__body">
            {ticket?.Messages?.length > 0 ? (
              ticket?.Messages.map(
                message =>
                  !message.Private && (
                    <TicketMessage
                      key={`message${message.Id}`}
                      message={message}
                      countTicket={ticket?.length}
                      isMessageOptionEnable={isMessageOptionEnable}
                      isDeleteModalOpen={isDeleteModalOpen}
                      handleMessageOptions={handleMessageOptions}
                      imagesSrc={imagesSrc}
                      voiceSrc={voiceSrc}
                      handleReplyMessage={handleReplyMessage}
                      handleChooseMesageType={handleChooseMesageType}
                      handleOpenDeleteModal={handleOpenDeleteModal}
                    />
                  )
              )
            ) : (
              <div dir="rtl" className="ticket__empty">
                این تیکت خالی است .
              </div>
            )}
          </div>
        </div>

        <TicketMessageFooter
          Disabled={location.state.state == "بسته شده"}
          ReplyMessage={ReplyMessage}
          handleReplyMessage={handleReplyMessage}
          messageType={messageType}
          MAX_TEXT_LENGTH={MAX_TEXT_LENGTH}
          text={text}
          handleCreateMessage={handleCreateMessage}
          handleChangeNewMesssage={handleChangeNewMesssage}
          handleChooseMesageType={handleChooseMesageType}
          setMessageType={setMessageType}
          loadedVoicePercent={loadedVoicePercent}
          loadedFilePercent={loadedFilePercent}
          handleUploadFile={handleUploadFile}
          handlers={handlers}
          recorderState={recorderState}
          recordings={recordings}
          handleDeleteRecording={handleDeleteRecording}
        />
      </div>
    </>
  );
};

export default Ticket;
