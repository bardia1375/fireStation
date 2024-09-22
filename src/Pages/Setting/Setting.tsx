import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation, useQuery } from "@tanstack/react-query";
import { successMessage, errorMessage } from "Utils/commonFunctions";
import { editSettingData } from "./Services/services";
import { getSettingData } from "Services/services";

function Setting() {
  // استفاده از useQuery برای درخواست به API
  const { data, isLoading, isError } = useQuery({
    queryKey: ["qualityTime"], // کلید یکتا برای کوئری
    queryFn: getSettingData,
  });

  const [items, setItems] = useState([
    { name: "1", value: "" },
    { name: "2", value: "" },
    { name: "3", value: "" },
    { name: "4", value: "" },
    { name: "5", value: "" },
  ]);

  useEffect(() => {
    if (data) {
      setItems([
        { name: "1", value: data.firstStage },
        { name: "2", value: data.secondStage },
        { name: "3", value: data.thirdStage },
        { name: "4", value: data.fourthStage },
        { name: "5", value: data.fifthStage },
      ]);
    }
  }, [data]);
  const { mutate } = useMutation(editSettingData, {
    onError: () => {
      errorMessage("خطا در ارسال داده‌ها!");
    },
  });
  const handleInputChange = (index, field, value) => {
    const updatedItems = items.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const submit = () => {
    if (items.some(item => item.value.trim() === "")) {
      errorMessage("لطفا تمام فیلدها پر شوند!");
      return;
    }

    const submitData = {
      id: data?.id,
      firstStage: items[0].value,
      secondStage: items[1].value,
      thirdStage: items[2].value,
      fourthStage: items[3].value,
      fifthStage: items[4].value,
    };
    console.log("ارسال داده:", submitData);
    mutate(submitData);
    successMessage("داده‌ها با موفقیت ثبت شدند");
  };

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (isError) return <p>خطا در دریافت داده‌ها</p>;

  return (
    <Card>
      <div style={{ width: "100%" }}>
        <div className="container">
          <div style={{ color: "#04165d" }} className="row bg_3">
            <h2>
              <i style={{ color: "#0089a7", fontSize: "1em" }}>تنظیمات</i>
            </h2>
          </div>
        </div>
      </div>
      <div style={{ width: "100%", display: "flex", gap: "32px", alignItems: "center" }}>
        <div style={{ width: "50%" }}>
          {items.map((item, index) => (
            <div
              key={index}
              className="col-3 input-effect"
              style={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <h4 style={{ whiteSpace: "nowrap" }}>{item.name}</h4>
              <input
                type="text"
                className="effect-21"
                value={item.value}
                placeholder="عنوان مدنظر را وارد کنید"
                onChange={e => handleInputChange(index, "value", e.target.value)}
              />
            </div>
          ))}
        </div>
        <div
          style={{
            width: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <h4 style={{ whiteSpace: "nowrap" }}>تنظیمات پیامک</h4>
          <input
            type="text"
            className="effect-21"
            disabled
            placeholder="این آیتم موقتا غیرفعال است."
          />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", marginTop: "8px" }}>
        <Button className="col-3 input-effect" style={{ padding: "4px 64px" }} onClick={submit}>
          ثبت
        </Button>
      </div>
    </Card>
  );
}

export default Setting;

// Styled Components
const Card = styled.div`
  position: relative;
  width: 100%;
  background: #fff;
  box-shadow: inset 0px -30px 99px #0000000a, 0px 8px 36px #a0bdc180;
  border-radius: 24px;
  padding: 24px;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.div`
  padding: 4px 12px;
  font-size: 20px;
  border-radius: 24px;
  box-shadow: 0px 7px 15px #00000033;
  margin: auto 0;
  text-align: center;
  cursor: pointer;
  color: #fff;
  background: #0089a7;
  transition: 500ms;
  &:hover {
    transform: scale(0.9);
  }
`;
