import ModalErrorStyled from "./Modal.style";

interface ModalProps {
  type: string;
  text: string;
}

const ModalError = ({ type, text }: ModalProps): JSX.Element => {
  return (
    <ModalErrorStyled className={type}>
      <span className="modal__title">{text}</span>
    </ModalErrorStyled>
  );
};
export default ModalError;
