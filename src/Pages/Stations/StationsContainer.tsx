import Modal from "Components/Modal/Modal";
import { useState } from "react";
import Stations from "./Stations";

const StationsContainer = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // Mock data
  const mockData = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      imgUrl: "/path-to-image-1.jpg",
      missionNumber: "11",
      clockMission: "1",
      name: "",
      connect: "",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      imgUrl: "/path-to-image-2.jpg",
      missionNumber: "12",
      clockMission: "2",
      name: "",
      connect: "",
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Johnson",
      imgUrl: "/path-to-image-3.jpg",
      missionNumber: "13",
      clockMission: "3",
      name: "",
      connect: "",
    },
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      imgUrl: "/path-to-image-1.jpg",
      missionNumber: "11",
      clockMission: "1",
      name: "",
      connect: "",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      imgUrl: "/path-to-image-2.jpg",
      missionNumber: "12",
      clockMission: "2",
      name: "",
      connect: "",
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Johnson",
      imgUrl: "/path-to-image-3.jpg",
      missionNumber: "13",
      clockMission: "3",
      name: "",
      connect: "",
    },
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      imgUrl: "/path-to-image-1.jpg",
      missionNumber: "11",
      clockMission: "1",
      name: "",
      connect: "",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      imgUrl: "/path-to-image-2.jpg",
      missionNumber: "12",
      clockMission: "2",
      name: "",
      connect: "",
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Johnson",
      imgUrl: "/path-to-image-3.jpg",
      missionNumber: "13",
      clockMission: "3",
      name: "",
      connect: "",
    },
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      imgUrl: "/path-to-image-1.jpg",
      missionNumber: "11",
      clockMission: "1",
      name: "",
      connect: "",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      imgUrl: "/path-to-image-2.jpg",
      missionNumber: "12",
      clockMission: "2",
      name: "",
      connect: "",
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Johnson",
      imgUrl: "/path-to-image-3.jpg",
      missionNumber: "13",
      clockMission: "3",
      name: "",
      connect: "",
    },
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      imgUrl: "/path-to-image-1.jpg",
      missionNumber: "11",
      clockMission: "1",
      name: "",
      connect: "",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      imgUrl: "/path-to-image-2.jpg",
      missionNumber: "12",
      clockMission: "2",
      name: "",
      connect: "",
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Johnson",
      imgUrl: "/path-to-image-3.jpg",
      missionNumber: "13",
      clockMission: "3",
      name: "",
      connect: "",
    },
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      imgUrl: "/path-to-image-1.jpg",
      missionNumber: "11",
      clockMission: "1",
      name: "",
      connect: "",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      imgUrl: "/path-to-image-2.jpg",
      missionNumber: "12",
      clockMission: "2",
      name: "",
      connect: "",
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Johnson",
      imgUrl: "/path-to-image-3.jpg",
      missionNumber: "13",
      clockMission: "3",
      name: "",
      connect: "",
    },
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      imgUrl: "/path-to-image-1.jpg",
      missionNumber: "11",
      clockMission: "1",
      name: "",
      connect: "",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      imgUrl: "/path-to-image-2.jpg",
      missionNumber: "12",
      clockMission: "2",
      name: "",
      connect: "",
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Johnson",
      imgUrl: "/path-to-image-3.jpg",
      missionNumber: "13",
      clockMission: "3",
      name: "",
      connect: "",
    },
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      imgUrl: "/path-to-image-1.jpg",
      missionNumber: "11",
      clockMission: "1",
      name: "",
      connect: "",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      imgUrl: "/path-to-image-2.jpg",
      missionNumber: "12",
      clockMission: "2",
      name: "",
      connect: "",
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Johnson",
      imgUrl: "/path-to-image-3.jpg",
      missionNumber: "13",
      clockMission: "3",
      name: "",
      connect: "",
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Johnson",
      imgUrl: "/path-to-image-3.jpg",
      missionNumber: "13",
      clockMission: "3",
      name: "",
      connect: "",
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Johnson",
      imgUrl: "/path-to-image-3.jpg",
      missionNumber: "13",
      clockMission: "3",
      name: "",
      connect: "",
    },
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      imgUrl: "/path-to-image-1.jpg",
      missionNumber: "11",
      clockMission: "1",
      name: "",
      connect: "",
    },

    {
      id: 20,
      firstName: "David",
      lastName: "Williams",
      imgUrl: "/path-to-image-20.jpg",
      missionNumber: "14",
      clockMission: "4",
      name: "",
      connect: "",
    },
  ];
  const handleEdit = user => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr ", gap: "8px" }}
      >
        {Array(28)
          .fill("")
          .map(person => (
            <Stations
              key={person.id}
              firstName={person.firstName}
              lastName={person.lastName}
              imgUrl={person.imgUrl}
              onEdit={() => handleEdit(person)}
              missionNumber={person.missionNumber}
              clockMission={person.clockMission}
              name={person.name}
              connect={person.connect}
            />
          ))}
      </div>
    </div>
  );
};

export default StationsContainer;
