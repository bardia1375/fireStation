export default function ImageMessage({ src,FileContent }) {
  console.log("content",FileContent);
  return (
    <span>
      <img className="ticket__Message-picture" width={200} src={`data:image/png;base64,${FileContent}`} />
    </span>
  );
}
