import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { convertEnglishNumberToPersian } from "./../../Utils/commonFunctions";

export default function UserInfo(params) {
  const Company = localStorage.getItem("Company");
  const profileConfig = localStorage.getItem("Responsible");

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
        setAnimation((prev) => ({
          ...prev,
          positionSize:
            nameRef.current?.offsetWidth -
            nameWrapperRef.current?.offsetWidth +
            20,
          positionHasAnimation: true,
        }));
      }
      if (nameRef2.current?.offsetWidth > nameWrapperRef2.current?.offsetWidth) {
        setAnimation((prev) => ({
          ...prev,
          nameSize:
            nameRef2.current?.offsetWidth -
            nameWrapperRef2.current?.offsetWidth +
            20,
          nameHasAnimation: true,
        }));
      }
    }, [nameRef2.current?.offsetWidth, nameRef.current?.offsetWidth]);
  return (
    <>
      <Link to="/profile" className="tickment__navbar__user">
        {/* <div className="tickment__navbar__userName">{`${profileConfig}`}</div> */}
        <PositionNameWrapper ref={nameWrapperRef}>
          <PositionName
            hasAnimation={animation.positionHasAnimation}
            moveSize={animation.positionSize}
            ref={nameRef}
            isHead={false}
          >
            {profileConfig}
          </PositionName>
        </PositionNameWrapper>

        <PositionNameWrapper ref={nameWrapperRef2} className="tickment__navbar__userCompany">
        <PositionName
            style={{fontSize:"1vw",marginTop:"-0.7px"}}
            hasAnimation={animation.nameHasAnimation}
            moveSize={animation.nameSize}
            ref={nameRef2}
            isHead={false}
          >
             {`${Company}`}
          </PositionName>
</PositionNameWrapper>
      </Link>
    </>
  );
}

const breatheAnimation = (x) => keyframes`
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
  font-size:1.5vw;
  width: max-content;
  margin-top: 8px;
.tickment__navbar__userCompany{
  font-size:0.5vw;
}
`;
const PositionName2 = styled.p`



`;
