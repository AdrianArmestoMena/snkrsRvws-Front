import styled from "styled-components";

const FilterFormStyle = styled.section`
  box-sizing: border-box;
  background-color: ${(props) => props.theme.drakGreen};
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.white};
  font-size: 1.3rem;
  .filter-form {
    &__title {
      color: ${(props) => props.theme.lightGreen};
      font-weight: 700;
      font-size: 1.7rem;
    }
    &__button-containter {
      display: flex;
      justify-content: center;
    }
    &__button {
      background-color: ${(props) => props.theme.lightGreen};
      color: ${(props) => props.theme.drakGreen};
      font-weight: 600;
      border-radius: 20px;
      max-width: 40%;
      :hover {
        background-color: ${(props) => props.theme.lightGreenHover};
      }
    }
  }
`;

export default FilterFormStyle;
