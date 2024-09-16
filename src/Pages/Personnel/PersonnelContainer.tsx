import Modal from "Components/Modal/Modal";
import { useState } from "react";
import Personnel from "./Personnel";
import FormContainer from "./Form/FormContainer";
import { useParams } from "react-router-dom";

const PersonnelContainer = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const params = useParams();
  console.log("params", params);
  // Mock data
  const mockData = [
    { id: 1, firstName: "John", lastName: "Doe", imgUrl: "/path-to-image-1.jpg" },
    { id: 2, firstName: "Jane", lastName: "Smith", imgUrl: "/path-to-image-2.jpg" },
    { id: 3, firstName: "Michael", lastName: "Johnson", imgUrl: "/path-to-image-3.jpg" },
    { id: 20, firstName: "David", lastName: "Williams", imgUrl: "/path-to-image-20.jpg" },
    { id: 2, firstName: "Jane", lastName: "Smith", imgUrl: "/path-to-image-2.jpg" },
    { id: 3, firstName: "Michael", lastName: "Johnson", imgUrl: "/path-to-image-3.jpg" },
    { id: 20, firstName: "David", lastName: "Williams", imgUrl: "/path-to-image-20.jpg" },
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
  const getData = data => {
    setUserData(data);
  };
  const Submit = data => {
    console.log("userData", userData);
  };
  return (
    <div style={{ width: "100%" }}>
      <div className="personnel-grid">
        {mockData.map(person => (
          <Personnel
            key={person.id}
            id={person.id}
            firstName={person.firstName}
            lastName={person.lastName}
            imgUrl={person.imgUrl}
            onEdit={() => handleEdit(person)}
          />
        ))}
      </div>

      <Modal showModal={showModal} closeModal={closeModal} title="Edit User" Submit={Submit}>
        {/* محتوا و فرم ویرایش کاربر */}
        {selectedUser && (
          <FormContainer getData={getData} setShowModal={setShowModal} mockData={mockData} />
        )}
      </Modal>
    </div>
  );
};

export default PersonnelContainer;
