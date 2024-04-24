import { convertEnglishNumberToPersian } from "./../../Utils/commonFunctions";

export default function FileMessage({
  message,
  fileName,
  messageId,
  imagesSrc,
  FileContent,
  handleDownloadFile,
  content
}) {
 console.log("message",message);
 console.log("messageId",messageId);
 console.log("fileName",fileName);
 console.log("imagesSrc",imagesSrc);
 console.log("FileContent",FileContent);
  return (
    <div className="ticket__Message-file">
      <div className="ticket__Message-file__download">
        {/* <p>{convertEnglishNumberToPersian(message)}</p> */}
        <span style={{position:"absolute",top:"-10px",right:0}}>
          <img src={"/images/file.svg"} alt="" />
        </span>
      </div>

      {/* <span className="msgOption" onClick={()=>handleDownloadFile(messageId)}>
        <img src="/images/download-brown.svg" alt="" />
      </span> */}
      <span className="ticket__Message-file-details">
        
        {convertEnglishNumberToPersian(fileName?.split(".")[1])} |{" "}
        {imagesSrc.length > 0
          ? convertEnglishNumberToPersian(
              imagesSrc.find((images) => images.messageId == messageId)?.size
            )
          : ""}

        MB
      </span>
    </div>
  );
}
