import React from "react";
import styled from "styled-components";
import { MdLock } from "react-icons/md"; // آیکون قفل

const NotPermission = () => {
  return (
    <Container>
      <LockIcon />
      <Message>شما مجوز دسترسی به این صفحه را ندارید</Message>
      <SubMessage>لطفاً با مدیر سیستم تماس بگیرید</SubMessage>
    </Container>
  );
};

export default NotPermission;

// استایل های کامپوننت
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const LockIcon = styled(MdLock)`
  font-size: 100px;
  color: #ff6b6b;
  margin-bottom: 20px;
`;

const Message = styled.h1`
  font-size: 32px;
  color: #333;
  margin-bottom: 10px;
`;

const SubMessage = styled.p`
  font-size: 18px;
  color: #777;
  margin-top: 0;
`;
