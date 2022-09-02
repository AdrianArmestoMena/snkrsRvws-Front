import ModalStyled from "./Modal.style";

interface ModalProps {
  type: string;
  text: string;
}

const ModalError = ({ type, text }: ModalProps) => {
  return (
    <ModalStyled className={`modal modal--${type}`}>
      <h2 className="modal__title">{text}</h2>
    </ModalStyled>
  );
};
export default ModalError;
