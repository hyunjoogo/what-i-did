import color from '../../../styles/color';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { MouseEventHandler, PropsWithChildren } from 'react';

type Props = {
  closeModal: () => void;
};

const Modal = ({ children, closeModal }: PropsWithChildren<Props>) => {
  const onClickBackdrop = () => {
    closeModal();
  };

  const preventCloseModal: MouseEventHandler = (event) => {
    event.stopPropagation();
  };

  return createPortal(
    <Backdrop onClick={onClickBackdrop}>
      <ModalContainer onClick={preventCloseModal}>{children}</ModalContainer>
    </Backdrop>,
    document.getElementById('modal-root') as HTMLElement,
  );
};

export default Modal;

const Backdrop = styled.div`
  position: fixed;
  min-width: 100vw;
  min-height: 100vh;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.4);

  z-index: 5;
`;

const ModalContainer = styled.div`
  width: 500px;

  padding: 20px;
  border-radius: 8px;

  background-color: ${color.white};

  overflow-y: auto;

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;
