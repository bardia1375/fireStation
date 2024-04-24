import styled from 'styled-components';

export const Modal = ({
  children,
  style,
  top,
  left,
  overlayWidth,
  overlayHeight,
  clickAnyWhere,
}) => {
  // When the user clicks anywhere outside of the modal, close it
  if (clickAnyWhere !== undefined) {
    window.onclick = function (event) {
      let modal = document.getElementById('modalBody');
      if (event.target !== modal && event.target.innerText !== 'مرحله بعد') {
        clickAnyWhere(false);
      }
    };
  }

  return (
    <div id='modalBody'>
      <Overlay overlayWidth={overlayWidth} overlayHeight={overlayHeight}></Overlay>
      <SModal style={style} top={top} left={left}>
        {children}
      </SModal>
    </div>
  );
};

export const Overlay = styled.div`
  position: absolute;
  top: 0%;
  left: 0%;
  width: ${({ overlayWidth }) => (overlayWidth ? overlayWidth : '110%')};
  height: ${({ overlayHeight }) => (overlayHeight ? overlayHeight : '100%')};
  background-color: #fff1;
  z-index: 2;
  backdrop-filter: blur(5px);
  transition: 300ms;

  width: 100%;
`;

export const SModal = styled.div`
  position: fixed;
  top: ${({ top }) => (top ? top : '50%')};
  left: ${({ left }) => (left ? left : '50%')};
  transform: translate(-50%, -50%);
  z-index: 3;
  transition: 500ms;
`;
