import { convertEnglishNumberToPersian } from "./../../Utils/commonFunctions";
import OptionItem from "./OptionItem";
import SenderInfo from "./SenderInfo";
import TextMessage from "./TextMessage";
import FileMessage from "./FileMessage";
import ImageMessage from "./ImageMessage";
import VoiceMessage from "./VoiceMessage";
import moment from "moment-jalaali";
import { useEffect, useState } from "react";

export default function TicketMessage({
  message,
  isMessageOptionEnable,
  isDeleteModalOpen,
  handleMessageOptions,
  imagesSrc,
  voiceSrc,
  handleReplyMessage,
  handleChooseMesageType,
  handleOpenDeleteModal,
  countTicket,
}) {
  console.log("imagesSrc", imagesSrc);
  const [username, setusername] = useState(null);
  useEffect(() => {
    if (message.Username) {
      setusername(message.Username);
    } else {
      setusername(null);
    }
  }, [message]);
  console.log("message.FileContent", message.FileContent);
  return (
    <>
      {true ? (
        <div
          className={`ticket__Message ${
            username === "crm admin" ? "ticket__Message-user " : "ticket__Message-support "
          }${
            isMessageOptionEnable.isEnable &&
            username === "crm admin" &&
            isMessageOptionEnable.messageId == message.Id
              ? "ticket__Message-user-selected "
              : ""
          }${
            isMessageOptionEnable.isEnable &&
            username !== "crm admin" &&
            isMessageOptionEnable.messageId == message.Id
              ? "ticket__Message-support-selected "
              : ""
          }${
            isDeleteModalOpen.isOpen && message.Id == isDeleteModalOpen.id ? "onDeleteMessage" : ""
          }`}
          onClick={() => handleMessageOptions(message.Id, message.Type)}
        >
          {/* options */}
          {(!message.CanDelete && message.Type !== 0 && username === "crm admin") ||
          username !== "crm admin" ? (
            <div className="option-three-dots"> </div>
          ) : null}

          <span
            className={`ticket__Message-options-desktop ${
              !message.CanDelete && message.Type == 0 && username === "crm admin" ? "opacity0" : ""
            }`}
          >
            {(message.Type == 1 || message.MimeType === "image/jpeg" || message.FileContent) && (
              <OptionItem
                message={message}
                FileName={message.FileName}
                FileContentItems={message.FileContent}
                href={
                  imagesSrc.length > 0
                    ? imagesSrc.find(images => images.messageId == message.Id)?.src
                    : ""
                }
              />
            )}
            {message.Type == 2 && (
              <OptionItem
                message={message}
                FileName={message.FileName}
                href={
                  voiceSrc.data.length > 0
                    ? voiceSrc.data.find(voice => voice.messageId == message.Id)?.src
                    : ""
                }
              />
            )}

            {/* {!username ? ( */}
            {false ? (
              <OptionItem
                type={"reply"}
                imgName="reply-message"
                onclick={e => {
                  handleReplyMessage(message.Message, message.Department, message.User);
                  handleChooseMesageType(e);
                }}
                id="reply-message"
              />
            ) : null}

            {false ? (
              <OptionItem
                type={"delete"}
                imgName="trash"
                onclick={() => handleOpenDeleteModal(true, message.Id, message.Type)}
              />
            ) : null}
          </span>

          {/* delete */}
          {username !== "crm admin" && <SenderInfo message={message} />}
          {/* {message.Type == 0 && <TextMessage message={message.Message} />} */}
          {message?.MimeType?.includes("image") && (
            <ImageMessage
              FileContent={message.FileContent}
              src={
                imagesSrc.length > 0
                  ? imagesSrc.find(images => images.messageId == message.Id)?.src
                  : ""
              }
            />
          )}
          {message?.MimeType?.includes("mp3") && (
            <>
              <VoiceMessage
                voiceSrc={voiceSrc}
                messageId={message.Id}
                FileContent={message.FileContent}
              />
            </>
          )}
          {true && <TextMessage message={message.Note} />}
          {message?.MimeType?.includes("/") && (
            <FileMessage
              message={message.Message}
              fileName={message.FileName}
              imagesSrc={imagesSrc}
              messageId={message.Id}
              FileContent={message.FileContent}
              FileName={message.FileName}
            />
          )}

          <span className="ticket__Message-time">
            {convertEnglishNumberToPersian(moment(message.Date).format("jYYYY-jMM-jDD   HH:MM"))}
          </span>

          {isMessageOptionEnable.isEnable && isMessageOptionEnable.messageId == message.Id && (
            <span
              className={`ticket__Message-options ${
                !message.CanDelete && message.Type == 0 && username === "crm admin"
                  ? "opacity0"
                  : ""
              }`}
            >
              {true && (
                <OptionItem
                  message={message}
                  FileName={message.FileName}
                  FileContent={message.FileContent}
                  href={
                    imagesSrc.length > 0
                      ? imagesSrc.find(images => images.messageId == message.Id)?.src
                      : ""
                  }
                />
              )}

              {isMessageOptionEnable.type == 2 && (
                <OptionItem
                  message={message}
                  FileName={message.FileName}
                  href={
                    voiceSrc.data.length > 0
                      ? voiceSrc.data.find(voice => voice.messageId == message.Id)?.link
                      : ""
                  }
                />
              )}

              {username !== "crm admin" ? (
                <OptionItem
                  type={"reply"}
                  imgName="reply-message"
                  onclick={e => {
                    handleReplyMessage(message.Message, message.Department, message.User);
                    handleChooseMesageType(e);
                  }}
                  id="reply-message"
                />
              ) : null}

              {message.CanDelete ? (
                <OptionItem
                  type={"delete"}
                  imgName="trash"
                  onclick={() => handleOpenDeleteModal(true, message.Id, message.Type)}
                />
              ) : null}
            </span>
          )}
        </div>
      ) : countTicket == 1 ? (
        <div dir="rtl" className="ticket__empty">
          این تیکت خالی است .
        </div>
      ) : null}
    </>
  );
}
