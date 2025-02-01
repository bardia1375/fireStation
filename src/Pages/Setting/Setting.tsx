import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { successMessage, errorMessage } from "Utils/commonFunctions";
import {
  editSettingData,
  editSettingRele,
  getSettingData,
  getSettingRele,
} from "./Services/services";
import { MdDownloadDone } from "react-icons/md";
import { useIsEndpointCrud } from "Utils/permissionUtils";

function Setting() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["qualityTime"],
    queryFn: getSettingData,
    
  });
  const { data: releData } = useQuery({
    queryKey: ["qualityRele"],
    queryFn: getSettingRele,
  });
  console.log("releDatareleData", releData);
  const endpoint = "/BaseSettings/UpsertSetting";
  const endpointNameAndSms = "/BaseSettings/UpsertSetting";

  const hasPermissionRele = useIsEndpointCrud(endpoint);
  const hasPermissionNameAndSms = useIsEndpointCrud(endpointNameAndSms);

  const queryClient = useQueryClient(); // Access the query client

  const role = localStorage.getItem("role");
  const [items, setItems] = useState([
    { name: "1:", value: "" },
    { name: "2:", value: "" },
    { name: "3:", value: "" },
    { name: "4:", value: "" },
    { name: "5:", value: "" },
  ]);
  const [rele, setRele] = useState([
    { name: "رله زنگ:", time: "", interval: "", delay: "" },
    { name: "رله یک:", time: "", interval: "", delay: "" },
    { name: "رله دو:", time: "", interval: "", delay: "" },
    { name: "رله سه:", time: "", interval: "", delay: "" },
    { name: "رله چهار:", time: "", interval: "", delay: "" },
    { name: "رله پنج:", time: "", interval: "", delay: "" },
  ]);
  const [companyName, setCompanyName] = useState(""); // جدید

  useEffect(() => {
    if (data || releData) {
      setItems([
        { name: "1 .", value: data?.firstStage },
        { name: "2 .", value: data?.secondStage },
        { name: "3 .", value: data?.thirdStage },
        { name: "4 .", value: data?.fourthStage },
        { name: "5 .", value: data?.fifthStage },
      ]);
      setRele([
        {
          name: "رله زنگ:",
          time: releData?.firstRelay,
          interval: releData?.firstRelayFrequency,
          delay: releData?.firstRelayDelay,
        },
        {
          name: "رله دو:",
          time: releData?.secondRelay,
          interval: releData?.secondRelayFrequency,
          delay: releData?.secondRelayDelay,
        },
        {
          name: "رله سه:",
          time: releData?.thirdRelay,
          interval: releData?.thirdRelayFrequency,
          delay: releData?.thirdRelayDelay,
        },
        {
          name: "رله چهارم:",
          time: releData?.fourthRelay,
          interval: releData?.fourthRelayFrequency,
          delay: releData?.fourthRelayDelay,
        },
        {
          name: "رله پنجم:",
          time: releData?.fifthRelay,
          interval: releData?.fifthRelayFrequency,
          delay: releData?.fifthRelayDelay,
        },
        {
          name: "رله ششم:",
          time: releData?.sixthRelay,
          interval: releData?.sixthRelayFrequency,
          delay: releData?.sixthRelayDelay,
        },
      ]);
      setCompanyName(data?.companyName || ""); // جدید
    }
  }, [data, releData]);

  const { mutate } = useMutation(editSettingData, {
    onError: () => {
      errorMessage("خطا در ارسال داده‌ها!");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getSettingData"]);
    },
  });
  const { mutate: mutateRele } = useMutation(editSettingRele, {
    onError: () => {
      errorMessage("خطا در ارسال داده‌ها!");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getSettingData"]);
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
  const handleReleChange = (index, field, value) => {
    const updatedRele = rele.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setRele(updatedRele);
  };

  const handleCompanyNameChange = e => {
    setCompanyName(e.target.value);
  };

  const submitRele = () => {
    const submitData = {
      firstRelay: rele[0].time,
      firstRelayDelay: rele[0].delay,
      firstRelayFrequency: rele[0].interval,
      secondRelay: rele[1].time,
      secondRelayDelay: rele[1].delay,
      secondRelayFrequency: rele[1].interval,
      thirdRelay: rele[2].time,
      thirdRelayDelay: rele[2].delay,
      thirdRelayFrequency: rele[2].interval,
      fourthRelay: rele[3].time,
      fourthRelayDelay: rele[3].delay,
      fourthRelayFrequency: rele[3].interval,
      fifthRelay: rele[4].time,
      fifthRelayDelay: rele[4].delay,
      fifthRelayFrequency: rele[4].interval,
      sixthRelay: rele[5].time,
      sixthRelayDelay: rele[5].delay,
      sixthRelayFrequency: rele[5].interval,
    };

    console.log("ارسال داده:", submitData);
    mutateRele(submitData);
    successMessage("داده‌ها با موفقیت ثبت شدند");
  };
  const submit = () => {
    // if (items.some(item => item.value.trim() === "") || companyName.trim() === "") {
    //   errorMessage("لطفا تمام فیلدها پر شوند!");
    //   return;
    // }

    const submitData = {
      id: data?.id,
      firstStage: items[0].value,
      secondStage: items[1].value,
      thirdStage: items[2].value,
      fourthStage: items[3].value,
      fifthStage: items[4].value,
      rele: rele,
      companyName: companyName, // اضافه کردن نام شرکت
    };
    console.log("ارسال داده:", submitData);
    mutate(submitData);
    successMessage("داده‌ها با موفقیت ثبت شدند");
  };

  if (isLoading) return <LoadingText>در حال بارگذاری...</LoadingText>;
  if (isError) return <ErrorText>خطا در دریافت داده‌ها</ErrorText>;

  return (
    <Card>
      <FormContainer>
        <InputSection>
          {" "}
          <div
            style={{
              textAlign: "left",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <Label fontSize="1.8rem"> عنوان:</Label>

            {hasPermissionNameAndSms && <MdDownloadDone color="green" size={20} onClick={submit} />}
          </div>
          {items.map((item, index) => (
            <InputWrapper key={index}>
              <Label>{item.name}</Label>
              <Input
                type="text"
                value={item.value}
                placeholder="عنوان مدنظر را وارد کنید"
                onChange={e => handleInputChange(index, "value", e.target.value)}
              />
            </InputWrapper>
          ))}
        </InputSection>
        <InputSectionRele>
          <div
            style={{
              textAlign: "left",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <Label fontSize="1.8rem"> تنظیمات رله:</Label>
            {hasPermissionRele && <MdDownloadDone color="green" size={20} onClick={submitRele} />}
          </div>
          {rele.map((item, index) => (
            <InputSectionInline key={index}>
              <InputWrapper>
                <Label>{item.name} زمان:</Label>
                <Input
                  type="number"
                  min={0}
                  max={255}
                  value={item.time}
                  placeholder="زمان را وارد کنید"
                  onChange={e =>
                    handleReleChange(index, "time", Math.max(0, Math.min(255, +e.target.value)))
                  }
                />
              </InputWrapper>
              <InputWrapper>
                <Label>{item.name} تناوب:</Label>
                <Input
                  type="number"
                  min={0}
                  max={255}
                  value={item.interval}
                  placeholder="تناوب را وارد کنید"
                  onChange={e =>
                    handleReleChange(index, "interval", Math.max(0, Math.min(255, +e.target.value)))
                  }
                />
              </InputWrapper>
              <InputWrapper>
                <Label>{item.name} تاخیر:</Label>
                <Input
                  type="number"
                  min={0}
                  max={255}
                  value={item.delay}
                  placeholder="تاخیر را وارد کنید"
                  onChange={e =>
                    handleReleChange(index, "delay", Math.max(0, Math.min(255, +e.target.value)))
                  }
                />
              </InputWrapper>
            </InputSectionInline>
          ))}
        </InputSectionRele>

        <InputSection>
          {" "}
          <div
            style={{
              textAlign: "left",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <Label fontSize="1.8rem"> تنظیمات نام و پیامک:</Label>

            {hasPermissionNameAndSms && <MdDownloadDone color="green" size={20} onClick={submit} />}
          </div>
          <InputWrapper>
            <Label> نام شرکت:</Label>
            <Input
              type="text"
              value={companyName}
              placeholder="نام شرکت خود را وارد کنید"
              onChange={handleCompanyNameChange}
            />{" "}
          </InputWrapper>{" "}
          <InputWrapper>
            <Label>تنظیمات پیامک:</Label>
            <Input disabled placeholder="این آیتم موقتا غیرفعال است." />
          </InputWrapper>
        </InputSection>
      </FormContainer>
      {/* {role === "Admin" && (
        <div>
          <Button onClick={submit}>ثبت</Button>
        </div>
      )} */}
    </Card>
  );
}

export default Setting;

// Styled Components
const Card = styled.div`
  position: relative;
  width: 100%;
  background: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  height: 100%;
  gap: 32px;
  overflow-y: scroll;
  @media (min-width: 1000px) {
    padding: 16px;
    gap: 16px;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: 1000px) {
    gap: 16px;
  }
`;

const InputSection = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 16px;
  padding: 0px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (min-width: 1000px) {
    padding: 16px;
  }
`;
const InputSectionRele = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 16px;
  padding: 0px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (min-width: 1000px) {
    padding: 16px;
  }
`;

const InputSectionInline = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  border-radius: 8px;

  @media (min-width: 1000px) {
    gap: 24px;
  }
`;

const InputSectionBottom = styled.div`
  width: 100%;

  gap: 16px;
  padding: 16px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (min-width: 1000px) {
    padding: 16px;
    gap: 24px;
  }
`;

const SettingsSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  @media (min-width: 1000px) {
    gap: 16px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: calc(50% - 16px);

  @media (min-width: 1000px) {
    width: calc(33% - 24px);
    gap: 8px;
  }
`;

const Label = styled.h4<{ fontSize?: string }>`
  margin: 0;
  font-size: 16px;
  color: #333;

  @media (min-width: 1000px) {
    font-size: ${props => (props.fontSize ? props.fontSize : "12px")};
  }
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;

  &:disabled {
    background-color: #f7f7f7;
  }

  @media (min-width: 1000px) {
    padding: 10px;
    font-size: 16px;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }

  &:active {
    background-color: #004080;
  }

  @media (min-width: 1000px) {
    padding: 12px 24px;
    font-size: 18px;
  }
`;

const LoadingText = styled.p`
  font-size: 16px;
  color: #007bff;

  @media (min-width: 1000px) {
    font-size: 18px;
  }
`;

const ErrorText = styled.p`
  font-size: 16px;
  color: #dc3545;

  @media (min-width: 1000px) {
    font-size: 18px;
  }
`;

export const Button = styled.div`
  gap: 10px;
  padding: 4px 4px;
  font-size: 20px;
  border-width: 2px;
  border-style: none;
  border-radius: 24px;
  box-shadow: 0px 7px 15px #00000033;
  white-space: nowrap;
  margin: auto 0;
  align-items: center;
  cursor: pointer;
  transition: 500ms;
  color: #fff;
  text-align: center;
  width: 100%;

  ${props => {
    switch (props.bg) {
      case "red":
        return css`
          background: red;
        `;
      case "blue":
        return css`
          background: blue;
        `;
      default:
        return css`
          background: #0089a7;
        `;
    }
  }}

  &:hover {
    transform: scale(0.9);
  }

  @media (min-width: 1000px) {
    padding: 4px 8px;
    font-size: 18px;
  }
`;
