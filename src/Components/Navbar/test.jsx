import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { convertEnglishNumberToPersian } from "./../../Utils/commonFunctions";
import styled, { css, keyframes } from "styled-components";

export default function UserInfo(params) {
  const Company = localStorage.getItem("Company");
  const profileConfig = localStorage.getItem("Responsible");

  const positionWrapperRef = useRef();
  const positionRef = useRef();
  const [animation, setAnimation] = useState({
    positionSize: 0,
    positionHasAnimation: false,
  });

  useEffect(() => {
    if (
      positionRef.current?.offsetWidth > positionWrapperRef.current?.offsetWidth
    ) {
      setAnimation((prev) => ({
        ...prev,
        positionSize:
          positionRef.current?.offsetWidth -
          positionWrapperRef.current?.offsetWidth +
          20,
        positionHasAnimation: true,
      }));
    }
  }, [positionRef.current?.offsetWidth]);

  return (
    <>
      <PositionNameWrapper ref={positionWrapperRef}>
        <PositionName
          className="tickment__navbar__userName"
          hasAnimation={animation.nameHasAnimation}
          moveSize={animation.nameSize}
          ref={positionRef}
          isHead={false}
        >
          FDFGDFGDFGDFGDFGDF
        </PositionName>
      </PositionNameWrapper>
    </>
  );
}

export const breatheAnimation = (x) => keyframes`
0%   { transform: translate(0, 0) }
100% { transform: translate(${x}px, 0)}  `;
export const PositionNameWrapper = styled.div`
  width: 120px;
  color: #fff;
`;

export const PositionName = styled.p`
  animation-name: ${({ hasAnimation, moveSize }) =>
    hasAnimation ? breatheAnimation(moveSize) : "d"};
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-fill-mode: linear;
  width: max-content;
  border: 10px solid blue;
`;
