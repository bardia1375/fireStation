import styled from "styled-components";

export const Modal = ({
  children,
  style,
  top,
  left,
  overlayWidth,
  overlayHeight,
  background
}) => {
  return (
    <>
      <Overlay
        overlayWidth={overlayWidth}
        overlayHeight={overlayHeight}
        background={background}
      ></Overlay>
      <SModal style={style} top={top} left={left}>
        {children}
      </SModal>
    </>
  );
};

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${({ overlayWidth }) => (overlayWidth ? overlayWidth : "100vw")};
  height: ${({ overlayHeight }) => (overlayHeight ? overlayHeight : "100vh")};
  background-color:${({ background }) => (background ? "rgba(0,0,0,0.5)" : "#fff1")}; 
  z-index: 2;
  backdrop-filter: blur(5px);
  transition: 300ms;
`;

export const SModal = styled.div`
  position: fixed;
  top: ${({ top }) => (top ? top : "60%")};
  left: ${({ left }) => (left ? left : "50%")};
  transform: translate(-50%, -50%);
  z-index: ${({ theme }) => theme.z.modal};
  transition: 500ms;
`;
