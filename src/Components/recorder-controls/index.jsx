import "./styles.css";

export default function RecorderControls({
  recorderState,
  handlers,
  handleUpload,
}) {
  const { recordingMinutes, recordingSeconds, initRecording } = recorderState;
  const { startRecording, saveRecording, cancelRecording } = handlers;

  return (
    <div className="controls-container">
      <div className="recorder-display">
        {/* <div className="recording-time">
          {initRecording && <div className="recording-indicator"></div>}
          <span>{formatSeconds(recordingSeconds)}</span>
          <span>:</span>
          <span>{formatMinutes(recordingMinutes)}</span>
        </div> */}
        {/* {initRecording && (
          <div className="cancel-button-container">
            <button
              className="cancel-button"
              title="Cancel recording"
              onClick={cancelRecording}
            >
              <img src="/images/trashVoice.svg" width={20} />
            </button>
          </div>
        )} */}
      </div>
      {/* <div className="start-button-container">
        {initRecording && (
          <button
            className="start-button"
            title="Save recording"
            disabled={recordingSeconds === 0}
            onClick={saveRecording}
          >
            faSave
          </button>
        )}
      </div> */}
    </div>
  );
}
