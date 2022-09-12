import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useReviews from "../../hooks/useReviews";
import ReviewCardStyle from "./ReviewCard.style";

interface ReviewCardProps {
  brand: string;
  model: string;
  owner: string;
  review: string;
  picture: string;
  id: string;
  backupImage: string;
}

const ReviewCard = ({
  brand,
  model,
  owner,
  review,
  picture,
  id,
  backupImage,
}: ReviewCardProps): JSX.Element => {
  const navigate = useNavigate();
  const { deleteReview } = useReviews();

  const deleteAction = () => {
    deleteReview(id);
  };

  return (
    <ReviewCardStyle className="review">
      <div className="review__mian-container">
        <div className="review__title-container">
          <div className="review__title-athor">
            <h2 className="review__title">{`${brand} ${model}`}</h2>
            <span className="review__author">
              {owner !== "" ? `by ${owner}` : ""}
            </span>
          </div>
          <button className="review__icon" onClick={deleteAction}>
            <FontAwesomeIcon className="review__icon" icon={faXmark} />
          </button>
        </div>
        <div className="review__image-container">
          <img
            className="review__image"
            width={500}
            src={backupImage}
            alt="bamba"
          />
        </div>
        <div className="review__buttons-container">
          <Button
            onClick={() => navigate(`/review/${id}`)}
            className="review__button review__view-button"
          >
            View Review
          </Button>
          <Button
            onClick={deleteAction}
            className="review__button review__delete-button"
          >
            Delete
          </Button>
        </div>
      </div>
      <p className="review__review">{review}</p>
    </ReviewCardStyle>
  );
};

export default ReviewCard;
