import styled from "styled-components";

const LoginStyle = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 30px;
  gap: 25px;
  @media (min-width: 900px) {
    flex-direction: row;
  }
  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
    &__button {
      width: 100px;
      align-self: center;
    }
  }
  .action-call {
    font-weight: 900;
    font-size: 2rem;
    color: ${(props) => props.theme.drakGreen};
    &__outstanding {
      color: ${(props) => props.theme.lightGreen};
    }
  }
`;

export default LoginStyle;
