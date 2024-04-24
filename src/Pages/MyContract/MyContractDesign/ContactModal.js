import { useState } from 'react';

// Components
import { Modal } from '../../../Components/Modal/Modal';
import styled from 'styled-components';

// Images
import Wink from './winki.gif';

export const ContactModal = ({ onClose }) => {
  return (
    <Modal clickAnyWhere={onClose}>
      {
        <>
          <ListContainer>
            <TopSide>
              <img style={{ width: '15vw' }} src={Wink} alt='Wink' />
            </TopSide>
            <Detail style={{ fontSize: '1.2vw' }}>
              در کنارتان هستیم. برای دریافت مشاوره تماس بگیرید
            </Detail>
            <Detail style={{ paddingTop: '10px', fontSize: '1vw' }}>
              <h7>41392000 - 021</h7>
            </Detail>
            <Detail style={{ padding: '5px 0', fontSize: '1vw' }}>
              <h7>داخلی 1</h7>
            </Detail>
            {/* <img src={Contact} alt='Contact' /> */}
          </ListContainer>
        </>
      }
    </Modal>
  );
};

export const Detail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  color: #37b3b8;
`;

export const CloseBadge = styled.img`
  position: absolute;
  top: ${({ position }) => (position ? `${position}px` : '-4px')};
  left: ${({ position }) => (position ? `${position}px` : '-4px')};
  z-index: 3;
  width: 20px;
  height: 20px;
  transition: 300ms;

  :hover {
    transform: scale(1.05);
  }
`;

export const ListContainer = styled.div`
  border-radius: 20px;
  border: 2px solid #b9d2d5;
  background-color: #eff8f8;
  color: black;
  font-family: Yekan Medium;
  width: 25vw;
  box-shadow: inset 0px 0px 50px 10px #b3e4eb;
`;

export const TopSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
