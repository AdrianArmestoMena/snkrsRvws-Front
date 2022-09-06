import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import ReviewCardStyle from "./ReviewCard.style";

interface ReviewCardProps {
  brand: string;
  model: string;
  owner: string;
  review: string;
  picture: string;
}

const ReviewCard = ({
  brand,
  model,
  owner,
  review,
  picture,
}: ReviewCardProps): JSX.Element => {
  return (
    <ReviewCardStyle className="review">
      <div className="review__mian-container">
        <div className="review__title-container">
          <div className="review__title-athor">
            <h2 className="review__title">{`${brand} ${model}`}</h2>
            <span className="review__author">{`by ${owner}`}</span>
          </div>
          <FontAwesomeIcon className="review__icon" icon={faXmark} />
        </div>
        <div className="review__image-container">
          <img
            className="review__image"
            width={500}
            src={picture}
            alt="bamba"
          />
        </div>
        <div className="review__buttons-container">
          <Button className="review__button review__view-button">
            View Review
          </Button>
          <Button className="review__button review__delete-button">
            Delete
          </Button>
        </div>
      </div>
      <p className="review__review">{review}</p>
    </ReviewCardStyle>
  );
};

export default ReviewCard;
