import Waveform from "./../../Pages/Waveform";

export default function VoiceMessage({ voiceSrc, messageId,FileContent }) {
  return (
    <div className="ticket__Message-file">
      <div className="ticket__Message-file__download">
        <span>
          <img src={"/images/whiteVoice.svg"} alt="" />
        </span>
        {/* <audio controls  src={`data:audio/mp3;base64,${FileContent}` || "k"} /> */}

        {true && (
          <Waveform
            id={
               "w"
            }
            // src={
            //   voiceSrc.data.length > 0
            //     ? voiceSrc.data.find((voices) => voices.messageId == messageId)
            //         ?.link
            //     : "w"
            // }
            src={
              FileContent
                    ?FileContent
                : "w"
            }
          />
        )}
      </div>
    </div>
  );
}
