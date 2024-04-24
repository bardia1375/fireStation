import "./styles.css";
import Waveform from "./../../Pages/Waveform";
import { convertEnglishNumberToPersian } from "./../../Utils/commonFunctions";
import { formatSeconds } from "../../Utils/format-time";
import { formatMinutes } from "./../../Utils/format-time";

export default function RecordingsList({ recorderState, recordings, del }) {
  const { recordingMinutes, recordingSeconds, initRecording } = recorderState;
  return (
    <>
      {recordings && (
        <>
          <div className="recordings-list">
            <div className="record" key={recordings.key}>
              <Waveform
                src={recordings.audio || "l"}
                id={recordings.key}
                isUploadingVoice
                recordingSeconds={recordingSeconds}
                recordingMinutes={recordingMinutes}
                deleteVoice={del}
              />
            </div>
          </div>
        </>
      )}

      {!recordings && (
        <span
          style={{
            position: "absolute",
            left: "20px",
            top: "5px",
            fontSize: "20px",
          }}
        >
          {convertEnglishNumberToPersian(formatSeconds(recordingSeconds))}
          &nbsp;:&nbsp;
          {convertEnglishNumberToPersian(formatMinutes(recordingMinutes))}
        </span>
      )}
    </>
  );
}
