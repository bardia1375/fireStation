import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { convertEnglishNumberToPersian } from "./../../Utils/commonFunctions";
import serverApi from "../../Services/httpService";
import { useQuery } from "@tanstack/react-query";
import { getSettingData } from "Services/services";

export default function UserInfo(params) {
  const Company = localStorage.getItem("Company");
  const profileConfig = localStorage.getItem("Responsible");
  const { isLoading, data } = useQuery({
    queryKey: ["getSettingData"],
    queryFn: getSettingData,
  });

  console.log("dsfsdf", data);

  const nameWrapperRef = useRef();
  const nameRef = useRef();

  const nameWrapperRef2 = useRef();
  const nameRef2 = useRef();

  const [animation, setAnimation] = useState({
    positionSize: 0,
    positionHasAnimation: false,
    nameSize: 0,
    nameHasAnimation: false,
  });

  // Motion Effect for name and position
  // useEffect(() => {
  //   if (nameRef.current?.offsetWidth > nameWrapperRef.current?.offsetWidth) {
  //     setAnimation((prev) => ({
  //       ...prev,
  //       positionSize:
  //         nameRef.current?.offsetWidth -
  //         nameWrapperRef.current?.offsetWidth +
  //         20,
  //       positionHasAnimation: true,
  //     }));
  //   }
  //   if (nameRef.current?.offsetWidth > nameWrapperRef.current?.offsetWidth) {
  //     setAnimation((prev) => ({
  //       ...prev,
  //       nameSize:
  //         nameRef.current?.offsetWidth -
  //         nameWrapperRef.current?.offsetWidth +
  //         20,
  //       nameHasAnimation: true,
  //     }));
  //   }
  // }, [nameRef.current?.offsetWidth]);

  // Motion Effect for name and position
  useEffect(() => {
    if (nameRef.current?.offsetWidth > nameWrapperRef.current?.offsetWidth) {
      setAnimation(prev => ({
        ...prev,
        positionSize: nameRef.current?.offsetWidth - nameWrapperRef.current?.offsetWidth + 20,
        positionHasAnimation: true,
      }));
    }
    if (nameRef2.current?.offsetWidth > nameWrapperRef2.current?.offsetWidth) {
      setAnimation(prev => ({
        ...prev,
        nameSize: nameRef2.current?.offsetWidth - nameWrapperRef2.current?.offsetWidth + 20,
        nameHasAnimation: true,
      }));
    }
  }, [nameRef2.current?.offsetWidth, nameRef.current?.offsetWidth]);
  const renderRole = () => {
    const role = localStorage.getItem("role");
    switch (role) {
      case "Admin":
        return "مدیر";
      case "NormalUser":
        return "کاربر سامانه";
        break;
      case "Watcher":
        return "مشاهده گر";
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div to="/" className="tickment__navbar__user">
        {/* <div className="tickment__navbar__userName">{`${profileConfig}`}</div> */}
        <PositionNameWrapper ref={nameWrapperRef}>
          <PositionName
            hasAnimation={animation.positionHasAnimation}
            moveSize={animation.positionSize}
            ref={nameRef}
            isHead={false}
          >
            {data?.companyName ? data?.companyName : "-"} ({renderRole()})
          </PositionName>
        </PositionNameWrapper>

        <PositionNameWrapper ref={nameWrapperRef2} className="tickment__navbar__userCompany">
          <PositionName
            style={{ fontSize: "1vw", marginTop: "-0.7px" }}
            hasAnimation={animation.nameHasAnimation}
            moveSize={animation.nameSize}
            ref={nameRef2}
            isHead={false}
          >
            سامانه پایش زمان{" "}
          </PositionName>
        </PositionNameWrapper>
      </div>
    </>
  );
}

const breatheAnimation = x => keyframes`
0%   { transform: translate(0, 0) }
100% { transform: translate(${x}px, 0)}  `;

const PositionNameWrapper = styled.div`
  overflow: hidden;
  width: 10vw;
  display: flex;
`;
const PositionName = styled.p`
  animation-name: ${({ hasAnimation, moveSize }) =>
    hasAnimation ? breatheAnimation(moveSize) : "d"};
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-fill-mode: linear;
  font-size: 1.5vw;
  width: max-content;
  margin-top: 8px;
  .tickment__navbar__userCompany {
    font-size: 0.5vw;
  }
`;
const PositionName2 = styled.p``;
