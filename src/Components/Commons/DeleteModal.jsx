export default function DeleteModal({
  handleOpenDeleteModal,
  handleDeleteMessage,
  isDeleting,
}) {
  return (
    <div className="deleteModal">
      <img
        src="/images/close.svg"
        alt=""
        onClick={() => handleOpenDeleteModal()}
      />
      <p>آیا از حذف این پیام مطمئنید؟</p>
      <div>
        <span onClick={() => !isDeleting && handleDeleteMessage()}>
          {isDeleting && <section className="loader-btn"> </section>}
          بله
        </span>
        <span onClick={() => handleOpenDeleteModal()}>خیر</span>
      </div>
    </div>
  );
}
