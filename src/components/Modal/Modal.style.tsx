import styled from "styled-components";

const ModalErrorStyled = styled.button`
  height: 100px;
  margin: 20px;
  border-radius: 20px;
  font-size: 20px;
  &.error {
    background-color: ${(props) => props.theme.errorBackgroudColor};
    border: 1px solid ${(props) => props.theme.errorBorderColor};
  }
`;

export default ModalErrorStyled;
