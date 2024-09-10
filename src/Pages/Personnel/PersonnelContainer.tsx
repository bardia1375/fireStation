import Modal from "Components/Modal/Modal";
import { useState } from "react";
import Personnel from "./Personnel";

const PersonnelContainer = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // Mock data
  const mockData = [
    { id: 1, firstName: "John", lastName: "Doe", imgUrl: "/path-to-image-1.jpg" },
    { id: 2, firstName: "Jane", lastName: "Smith", imgUrl: "/path-to-image-2.jpg" },
    { id: 3, firstName: "Michael", lastName: "Johnson", imgUrl: "/path-to-image-3.jpg" },
    { id: 20, firstName: "David", lastName: "Williams", imgUrl: "/path-to-image-20.jpg" },
  ];
  const handleEdit = user => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="personnel-grid">
        {mockData.map(person => (
          <Personnel
            key={person.id}
            firstName={person.firstName}
            lastName={person.lastName}
            imgUrl={person.imgUrl}
            onEdit={() => handleEdit(person)}
          />
        ))}
      </div>

      <Modal showModal={showModal} closeModal={closeModal} title="Edit User">
        {/* محتوا و فرم ویرایش کاربر */}
        {selectedUser && (
          <div>
            <p>
              
            </p>
            {/* Form for editing the user details */}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PersonnelContainer;
