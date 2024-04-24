import { useEffect, useState } from "react";

export default function OptionItem({
  message,
  type,
  FileName,
  href,
  imgName,
  onclick,
  id,
  FileContentItems,
}) {
  // const [fileContent, setFileContent] = useState("");
  // const [fileData, setFileData] = useState(null);
  // console.log("typetypetype", message);
  // useEffect(() => {
  //   // Your response data
  //   const responseData = {
  //     Note: "salam",
  //     Username: "سبحان لاچینی",
  //     Date: "2023-12-13T07:20:23Z",
  //     FileContent: "MTA6MjQ6MjY=",
  //     MimeType: "text/html",
  //   };
  //   // Decode base64 content and set it in the state
  //   const decodedContent = base64.decode(responseData?.FileContent)
  //   console.log("decodedContent", decodedContent);
  //   setFileData(decodedContent);
  // }, [message]);
  // const handleDownload = () => {
  //   // Create a Blob from the decoded content
  //   console.log("responseData.FileContent", message);

  //   const blob = new Blob([fileData], { type: message.MimeType });
  //   console.log("message.MimeType", message.MimeType);
  //   // Create a download link
  //   const link = document.createElement("a");
  //   link.href = URL.createObjectURL(blob);
  //   switch (message.MimeType) {
  //     case "text/html":
  //       link.download = "output.txt";
  //       break;
  //     case "image/jpeg":
  //       link.download = "output.jpeg";
  //       break;
  //     case "application/pdf":
  //       link.download = "output.pdf";
  //       break;

  //     default:
  //       break;
  //   }

  //   // Append the link to the body and trigger the click event
  //   document.body.appendChild(link);
  //   link.click();

  //   // Remove the link from the body
  //   document.body.removeChild(link);
  // };
  // // useEffect(() => {
  // //   // Extract FileContent and MimeType from the response
  // //   // const messages = FileContentItems.Data.Messages;
  // //   // const messages = FileContentItems;

  // //   // const fileMessage = messages.find(message => message.FileContent);
  // //   const base64String = FileContentItems;

  // //   try {
  // //     const decodedString = atob(base64String);
  // //     console.log("decodedString", decodedString);
  // //     const blob = new Blob([decodedString], { type: "application/pdf" });
  // //     const downloadUrl = URL.createObjectURL(blob);
  // //     console.log("downloadUrl", downloadUrl);
  // //     setFileContent(downloadUrl);
  // //   } catch (error) {
  // //     console.error("Error decoding base64 string:", error.message);
  // //   }
  // //   //  Optionally, you can handle the download logic here as well
  // //   // Handle the download logic as needed
  // //   // if (true) {
  // //   //   const fileContentBase64 =FileContentItems;
  // //   //   // const mimeType = fileMessage.MimeType;

  // //   //   // Decode the Base64-encoded file content
  // //   //   const decodedFileContent = atob(fileContentBase64);
  // //   //   console.log("decodedFileContent",decodedFileContent);
  // //   //   // Set the file content to state
  // //   //   setFileContent(decodedFileContent);

  // //   //   // Optionally, you can handle the download logic here as well
  // //   //   // const blob = new Blob([decodedFileContent], { type: mimeType });
  // //   //   // const downloadUrl = URL.createObjectURL(blob);
  // //   //   // Handle the download logic as needed
  // //   //   console.log("fileContent", fileContent);
  // //   // } else {
  // //   //   // Handle the case where no file message is found
  // //   //   console.error("No file message found in the response");
  // //   // }
  // // }, [FileContentItems]);
  // console.log("FileContentItems", FileContentItems);
  // console.log("fileContent", fileContent);

  const [fileData, setFileData] = useState(null);

 useEffect(()=>{
  setFileData(message)
 },[message])

 const downloadFile = () => {
  if (fileData) {
    // Decode the base64 string to obtain the original file content.
    const decodedFileContent = atob(fileData.FileContent);

    // Create a Uint8Array from the decoded file content.
    const arrayBuffer = new Uint8Array(decodedFileContent.length);
    for (let i = 0; i < decodedFileContent.length; i++) {
      arrayBuffer[i] = decodedFileContent.charCodeAt(i);
    }

    // Create a Blob from the Uint8Array.
    const blob = new Blob([arrayBuffer], { type: fileData.MimeType });

    // Create a URL for the Blob and initiate the download.
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    console.log("fileData",fileData);
    link.download = `${fileData?.Note?fileData?.Note:"فایل"}`;
    link.click();

    // Release the object URL to free up resources.
    window.URL.revokeObjectURL(url);
  }
};



  return type == "download" ? (
    <img src={`/images/download.svg`} onClick={downloadFile} />
  ) : (
    <img src={`/images/${imgName}.svg`} alt="" id={id} onClick={onclick} />
  );
}
OptionItem.defaultProps = {
  type: "download",
};
