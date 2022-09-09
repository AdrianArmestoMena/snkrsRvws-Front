import styled from "styled-components";

const DetailReviewStyle = styled.article`
  border-radius: 20px;
  padding: 10px;
  background-color: ${(props) => props.theme.drakGreen};
  color: ${(props) => props.theme.lightGreen};
  .review {
    &__mian-container {
      height: 100%;
      width: 100%;
      padding: 20px 20px 0px 20px;
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
      border-radius: 10px;
      height: auto;
      max-height: 30rem;
      overflow: hidden;
      float: left;
      margin: 20px;
      float: none;
      @media (min-width: 900px) {
        float: left;
      }
    }

    &__image {
      border-radius: 10px;
      max-width: 100%;
      max-height: 100%;
    }
    &__buttons-container {
      display: flex;
      gap: 5px;
      justify-content: centera;
    }
    &__button {
      border-radius: 120px;
      width: 45%;
      height: 60px;
      margin: 10px;
      min-width: 150px;
      background-color: ${(props) => props.theme.lightGreen};
      color: ${(props) => props.theme.drakGreen};
      :hover {
        border: 3px solid black;
      }
    }
    &__view-button {
      align-self: flex-start;
    }
    &__view-button:hover {
      align-self: flex-start;
    }
    &__review {
      display: block;
      flex: 1;
      font-weight: 700;
      font-size: 1.2rem;
      background-color: ${(props) => props.theme.drakGreen};
      color: white;
      padding: 20px;
      line-height: 2.1rem;
      border-radius: 10px;
    }
  }
`;
export default DetailReviewStyle;
