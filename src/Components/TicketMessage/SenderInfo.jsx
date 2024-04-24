export default function SenderInfo({ message }) {
  return (
    <span
      style={{
        background:
          message.Department == "مدیر پشتیبانی"
            ? "transparent linear-gradient(256deg, #808080 0%, #BABABA 100%) 0% 0% no-repeat padding-box"
            : "transparent linear-gradient(262deg, #BF9685 0%, #966C5A 100%) 0% 0% no-repeat padding-box",
      }}
      className="ticket__Message-departmentName"
    >{`${message.Username}  |  کارشناس`}</span>
  );
}
