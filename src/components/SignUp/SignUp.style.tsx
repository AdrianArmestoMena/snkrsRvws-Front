import styled from "styled-components";

const SignUpStyle = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 30px;
  gap: 20px;
  @media (min-width: 900px) {
    flex-direction: row;
  }
  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1.5;
    &__button {
      width: 100px;
      align-self: center;
    }
  }
  .action-call {
    font-weight: 900;
    font-size: 3rem;
    flex: 2;
    color: ${(props) => props.theme.drakGreen};
    &__outstanding {
      color: ${(props) => props.theme.lightGreen};
    }
  }
  .form__button {
    border-radius: 5px;
  }
`;

export default SignUpStyle;
