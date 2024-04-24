import { convertEnglishNumberToPersian } from "./../../Utils/commonFunctions";

export default function TextMessage({ message }) {
  return (
    <>
      {message?.startsWith("http") ? (
        <a
          href={`${message}`}
          className="ticket__Message-text"
          style={{ color: "blue" }}
        >
          {convertEnglishNumberToPersian(message)}
        </a>
      ) : (
        <p className="ticket__Message-text">
          {convertEnglishNumberToPersian(message)}
        </p>
      )}
    </>
  );
}
