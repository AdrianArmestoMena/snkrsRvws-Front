import styled from "styled-components";

const ReviewCardStyle = styled.li`
  border: 2px solid black;
  border-radius: 20px;
  padding: 10px;
  display: flex;
  .review {
    &__mian-container {
      height: 100%;
      width: 100%;
      padding: 10px;
      flex: 1;
    }
    &__title-container {
      display: flex;
      justify-content: space-between;
    }
    &__title {
      font-size: 2.2rem;
      font-weight: 600;
    }
    &__delete-icon {
      align-self: flex-end;
      justify-self: flex-end;
      padding-bottom: 50px;
    }
    &__image-container {
      height: 50%;
      width: 100%;
      border-radius: 10px;
    }
    &__icon {
      width: 40px;
      height: 40px;
      @media (min-width: 900px) {
        display: none;
      }
    }
    &__icon:hover {
      color: ${(props) => props.theme.errorBorderColor};
    }
    &__image {
      border-radius: 10px;
      max-width: 100%;
    }
    &__buttons-container {
      display: flex;
      gap: 5px;
    }
    &__delete-button {
      display: none;
      @media (min-width: 900px) {
        display: block;
      }
    }
    &__button {
      border-radius: 120px;
      width: 45%;
      height: 50px;
      margin: 10px;
      min-width: 150px;
    }
    &__view-button {
      align-self: flex-start;
    }
    &__view-button:hover {
      align-self: flex-start;
    }
    &__review {
      max-height: 100%;
      display: none;
      flex: 1;
      font-weight: 700;
      font-size: 1.2rem;
      background-color: ${(props) => props.theme.drakGreen};
      color: white;
      padding: 20px;
      line-height: 2.1rem;
      border-radius: 10px;
      @media (min-width: 900px) {
        display: block;
      }
    }
  }
`;
export default ReviewCardStyle;
