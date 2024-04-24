import { convertEnglishNumberToPersian } from "./../../Utils/commonFunctions";
import RecordingsList from "./../recordings-list/index";

export default function TicketMessageFooter({
  Disabled,
  ReplyMessage,
  handleReplyMessage,
  messageType,
  MAX_TEXT_LENGTH,
  text,
  handleCreateMessage,
  handleChangeNewMesssage,
  handleChooseMesageType,
  setMessageType,
  loadedVoicePercent,
  loadedFilePercent,
  handleUploadFile,
  handlers,
  recorderState,
  recordings,
  handleDeleteRecording,
}) {
  const {
    startRecording,
    saveRecording,
    cancelRecording,
    pauseRecording,
    resumeRecording,
  } = handlers;

  const { audio, src, isRecording, initRecording } = recorderState;
  const handleStartVoice = (e) => {
    if(Disabled)
      return;

    if (!isRecording) {
      handleChooseMesageType(e);
      startRecording();
    } else {
      saveRecording();
    }
  };
  const handleSaveRecording = (e) => {
    saveRecording();
  };

  const handlePauseRecording = (e) => {
    pauseRecording();
  };
  const handleResumeRecording = (e) => {
    resumeRecording();
  };

  return (
    <div className="ticket__footer">
      {ReplyMessage.text && (
        <div className="ticket__footer__replyMessageContainer">
          <img src={`/images/replyMessage.svg`} />
          <img
            src={`/images/close.svg`}
            className="ticket__footer__replyMessage__close"
            onClick={() => handleReplyMessage()}
          />
          <span
            className="ticket__footer__replyMessage__owner"
            style={{
              background:
                ReplyMessage.department == "مدیر پشتیبانی"
                  ? "transparent linear-gradient(256deg, #808080 0%, #BABABA 100%) 0% 0% no-repeat padding-box"
                  : "transparent linear-gradient(262deg, #BF9685 0%, #966C5A 100%) 0% 0% no-repeat padding-box",
            }}
          >{`${ReplyMessage.user}  |  ${ReplyMessage.department}`}</span>
          <div className="ticket__footer__replyMessage">
            {ReplyMessage.text}
          </div>
          <div
            className="option-three-dots dotreply"
            style={{ left: 15, right: "unset" }}
          >
            {" "}
          </div>
        </div>
      )}

      <div className="ticket__actions ticket__actions-desktop">
        <div className="ticket__actions__textMessageContainer">
          {(messageType == "none" || messageType == "reply-message") && (
            <>
              <div className="ticket__actions__textMessageBox">
                <span
                  style={{
                    color: text.length >= MAX_TEXT_LENGTH ? "red" : "black",
                  }}
                  className="ticket__actions__textCounter"
                >
                  {convertEnglishNumberToPersian(MAX_TEXT_LENGTH - text.length)}
                </span>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCreateMessage();
                  }}
                >
                  <textarea
                    disabled={Disabled}
                    type="text"
                    value={convertEnglishNumberToPersian(text)}
                    onChange={(e) => {
                      !e.target.value.endsWith("\n") &&
                        handleChangeNewMesssage(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      !e.shiftKey && e.key == "Enter" && handleCreateMessage();
                      e.shiftKey &&
                        e.key == "Enter" &&
                        handleChangeNewMesssage("\n");
                    }}
                    className="ticket__newMessageInput"
                    placeholder="چیزی بنویسید ..."
                    cols="30"
                    rows="10"
                  ></textarea>
                </form>

                <span
                  className={`ticket__actions__Btn__textMsg ${
                    text.trim().length > 0 && text.length <= MAX_TEXT_LENGTH
                      ? "ticket__actions__Btn__textMsg-full"
                      : "ticket__actions__Btn__textMsg-empty"
                  }`}
                >
                  <img
                    src={`/images/sendMessage-icon.svg`}
                    onClick={handleCreateMessage}
                  />
                </span>
              </div>
            </>
          )}
          {messageType == "voice-message-desktop" && (
            <div className="recorder-container">
              <RecordingsList
                recorderState={recorderState}
                recordings={recordings}
                del={() => {
                  setMessageType("none");

                  handleDeleteRecording();
                }}
              />
            </div>
          )}
        </div>
        {recordings !== null ? (
          <span
            className="ticket__actions__Btn__VoiceMsg   ticket__actions__Btn__textMsg-full"
            onClick={() => {
              handleUploadFile(recordings.src, "voice", handleDeleteRecording);
            }}
          >
            {loadedVoicePercent > 0 ? (
              `${convertEnglishNumberToPersian(
                Math.round(loadedVoicePercent)
              )}%`
            ) : (
              <img
                src="/images/sendMessage-icon.svg"
                id="voice-message-desktop"
                alt=""
                style={{
                  translate: "transform(rotate(320deg))",
                }}
              />
            )}
          </span>
        ) : (
          <span className={`ticket__actions__Btn`}>
            {!initRecording && (
              <img
                src="/images/sendVoice-icon.svg"
                id="voice-message-desktop"
                onClick={handleStartVoice}
                alt=""
                style={{
                 
                  width: "30px",
                }}
              />
            )}
            {initRecording && (
              <div className="pauseAndResumeVoice">
                <img
                  src="/images/stopRecording.svg"
                  id="voice-message-desktop"
                  onClick={handleSaveRecording}
                  alt=""
                  style={{
                    position: "absolute",
                    right: "-50px",
                    top: "-15px",
                    width: "10px",
                  }}
                />
                {isRecording && (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="31.936"
                      height="42.967"
                      viewBox="0 0 31.936 42.967"
                    >
                      <defs>
                        <linearGradient
                          id="linear-gradient"
                          x1="0.951"
                          y1="-0.065"
                          x2="-0.542"
                          y2="2.038"
                          gradientUnits="objectBoundingBox"
                        >
                          <stop offset={0} stopColor="#37abb8" />
                          <stop offset={1} stopColor="#71fbff" />
                        </linearGradient>
                      </defs>
                      <path
                        id="sendVoice-icon"
                        d="M13.75,40.729V33.845A16.066,16.066,0,0,1,0,17.9a2.218,2.218,0,1,1,4.435,0,11.533,11.533,0,1,0,23.065,0,2.218,2.218,0,1,1,4.435,0,16.066,16.066,0,0,1-13.75,15.943v6.883a2.218,2.218,0,1,1-4.435,0ZM7.984,17.975V7.984a7.984,7.984,0,0,1,15.968,0v9.991a7.984,7.984,0,0,1-15.968,0Z"
                        // fill="url(#linear-gradient)"
                        className="isRecordingBadge"
                      />
                    </svg>
                  </>
                )}
              </div>
            )}
          </span>
        )}
        {/* <span onClick={saveRecording}>save</span> */}
        <label htmlFor="messageFile" className="ticket__actions__Btn">
          {loadedFilePercent > 0 ? (
            <>{`${convertEnglishNumberToPersian(
              Math.round(loadedFilePercent)
            )}%`}</>
          ) : (
            <img src="/images/sendFile-icon.svg" id="file-message" alt="" style={{width:"25px"}}/>
          )}
        </label>
        <input
          type="file"
          disabled={Disabled}
          value={""}
          onChange={(e) => handleUploadFile(e.target.files[0], "file")}
          id="messageFile"
          style={{ display: "none" }}
        />
      </div>

      {/* mobile start */}
      {messageType == "none" && (
        <div className="ticket__actions ticket__actions-mobile">
          <div className="ticket__actions__textMessageContainer">
            <div className="ticket__actions__Btn ticket__actions__Btn-msg">
              <img
                src="/images/sendMessage-icon.svg"
                id="text-message-mobile"
                onClick={handleChooseMesageType}
                alt=""
                className="msgf"
              />
            </div>
          </div>
          <span className="ticket__actions__Btn">
            <img
              src="/images/sendVoice-icon.svg"
              id="voice-message-mobile"
              onClick={(e) => {
                handleChooseMesageType(e);
                handleStartVoice(e);
              }}
              alt=""
            />
          </span>

          <label htmlFor="messageFile" className="ticket__actions__Btn">
            {loadedFilePercent > 0 ? (
              <>{`${convertEnglishNumberToPersian(
                Math.round(loadedFilePercent)
              )}%`}</>
            ) : (
              <img src="/images/sendFile-icon.svg" id="file-message" alt="" />
            )}
          </label>
          <input
            type="file"
            disabled={Disabled}
            value={""}
            onChange={(e) => handleUploadFile(e.target.files[0], "file")}
            id="messageFile"
            style={{ display: "none" }}
          />
        </div>
      )}

      {/* mobile end */}
      {messageType !== "none" && (
        <div className="ticket__selected-action">
          {messageType == "text-message-mobile" && (
            <>
              <textarea
                type="text"
                disabled={Disabled}
                value={convertEnglishNumberToPersian(text)}
                onChange={(e) => {
                  !e.target.value.endsWith("\n") &&
                    handleChangeNewMesssage(e.target.value);
                }}
                onKeyDown={(e) => {
                  !e.shiftKey && e.key == "Enter" && handleCreateMessage();
                  e.shiftKey &&
                    e.key == "Enter" &&
                    handleChangeNewMesssage("\n");
                }}
                className="ticket__newMessageInput"
                placeholder="چیزی بنویسید ..."
                cols="30"
                rows="10"
              ></textarea>
              {/* <input
                type="text"
                value={text}
                onChange={(e) => handleChangeNewMesssage(e.target.value)}
                className="ticket__newMessageInput"
              /> */}
              <span
                className={`ticket__actions__Btn ticket__actions__Btn-msg ${
                  text.trim().length > 0
                    ? "ticket__actions__Btn__textMsg-full"
                    : "ticket__actions__Btn__textMsg-empty"
                }`}
              >
                <img
                  src={`/images/sendMessage-icon.svg`}
                  onClick={handleCreateMessage}
                />
              </span>
            </>
          )}
          {messageType == "reply-message" && (
            <>
              <form
                style={{
                  width: "100%",
                }}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCreateMessage(e);
                }}
              >
                <textarea
                  type="text"
                  disabled={Disabled}
                  value={convertEnglishNumberToPersian(text)}
                  onChange={(e) => {
                    !e.target.value.endsWith("\n") &&
                      handleChangeNewMesssage(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    !e.shiftKey && e.key == "Enter" && handleCreateMessage();
                    e.shiftKey &&
                      e.key == "Enter" &&
                      handleChangeNewMesssage("\n");
                  }}
                  className="ticket__newMessageInput"
                  placeholder="چیزی بنویسید ..."
                  cols="30"
                  rows="10"
                ></textarea>
                {/* <input
                  type="text"
                  value={text}
                  onChange={handleChangeNewMesssage}
                  className="ticket__newMessageInput"
                /> */}
              </form>
              {text.trim().length > 0 ? (
                <img
                  src={`/images/blue-replyMessage.svg`}
                  onClick={handleCreateMessage}
                />
              ) : (
                <img src={`/images/replyMessage.svg`} />
              )}
            </>
          )}
          {messageType == "voice-message-mobile" && (
            <div
              className="recorder-container"
              style={{ marginBottom: "3rem" }}
            >
              <RecordingsList
                recorderState={recorderState}
                recordings={recordings}
                del={() => {
                  setMessageType("none");

                  handleDeleteRecording();
                }}
              />
            </div>
          )}
          {messageType == "voice-message-mobile" && recordings !== null && (
            <span
              className="ticket__actions__Btn-fullvoice"
              onClick={() => {
                handleUploadFile(
                  recordings.src,
                  "voice",
                  handleDeleteRecording
                );
              }}
            >
              {loadedVoicePercent > 0 ? (
                `${convertEnglishNumberToPersian(
                  Math.round(loadedVoicePercent)
                )}%`
              ) : (
                <img
                  src="/images/sendMessage-icon.svg"
                  alt=""
                  style={{
                    translate: "transform(rotate(320deg))",
                  }}
                />
              )}
            </span>
          )}
          {messageType == "voice-message-mobile" && recordings == null && (
            <>
              <span className={`ticket__actions__Btn`}>
                {!initRecording && (
                  <img
                    src="/images/sendVoice-icon.svg"
                    onClick={handleStartVoice}
                    alt=""
                  />
                )}
                {initRecording && (
                  <div className="pauseAndResumeVoice">
                    <img
                      src="/images/stopRecording.svg"
                      onClick={handleSaveRecording}
                      alt=""
                      style={{
                        position: "absolute",
                        right: "-50px",
                        top: "-15px",
                        width: "20px",
                      }}
                    />
                    {isRecording && (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          width="31.936"
                          height="42.967"
                          viewBox="0 0 31.936 42.967"
                        >
                          <defs>
                            <linearGradient
                              id="linear-gradient"
                              x1="0.951"
                              y1="-0.065"
                              x2="-0.542"
                              y2="2.038"
                              gradientUnits="objectBoundingBox"
                            >
                              <stop offset={0} stopColor="#37abb8" />
                              <stop offset={1} stopColor="#71fbff" />
                            </linearGradient>
                          </defs>
                          <path
                            id="sendVoice-icon"
                            d="M13.75,40.729V33.845A16.066,16.066,0,0,1,0,17.9a2.218,2.218,0,1,1,4.435,0,11.533,11.533,0,1,0,23.065,0,2.218,2.218,0,1,1,4.435,0,16.066,16.066,0,0,1-13.75,15.943v6.883a2.218,2.218,0,1,1-4.435,0ZM7.984,17.975V7.984a7.984,7.984,0,0,1,15.968,0v9.991a7.984,7.984,0,0,1-15.968,0Z"
                            // fill="url(#linear-gradient)"
                            className="isRecordingBadge"
                          />
                        </svg>
                      </>
                    )}
                  </div>
                )}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
