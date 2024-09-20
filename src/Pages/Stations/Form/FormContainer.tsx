import React from "react";
import Form from "./Form";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getStatiosById } from "../Services/services";

function FormContainer({ getData, setShowModal, mockData, deviceState }) {
  const { id } = useParams(); // دریافت id از آدرس

  console.log("Received id:", id); // بررسی id در console

  // فقط وقتی useQuery را فراخوانی کنید که id وجود داشته باشد
  const {
    data: oneStationSetting,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", id],
    queryFn: () => getStatiosById(id), // ارسال id به تابع getStatiosById
    enabled: !!id, // این خط باعث می‌شود useQuery فقط وقتی که id وجود دارد اجرا شود
  });

  console.log("oneStationSetting", oneStationSetting); // بررسی داده‌های دریافتی

  return (
    <div>
      <Form
        getData={getData}
        oneStationSetting={oneStationSetting}
        setShowModal={setShowModal}
        mockData={mockData}
        deviceState={deviceState}
      />
    </div>
  );
}

export default FormContainer;
