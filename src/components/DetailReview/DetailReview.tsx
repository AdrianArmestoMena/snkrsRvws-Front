import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import useReviews from "../../hooks/useReviews";
import { useAppSelector } from "../../store/hooks";
import DetailReviewStyle from "./DetailReviews.style";

const DetailReview = (): JSX.Element => {
  let { id } = useParams();
  const navigate = useNavigate();
  const { loadReviewById } = useReviews();
  const [review] = useAppSelector((state) => state.reviews);

  useEffect(() => {
    loadReviewById(id as string);
  }, [loadReviewById, id]);
  const { deleteReview } = useReviews();

  const deleteAction = () => {
    deleteReview(id as string);
    navigate("/your-reviews");
  };

  return (
    <DetailReviewStyle>
      <div className="review__mian-container">
        <h2 className="review__title">{`${review.brand} ${review.model}`}</h2>
        <span className="review__author">{`by ${review.owner}`}</span>
      </div>
      <div className="review__image-container">
        <img
          className="review__image"
          width={500}
          src={review.backupImage}
          alt={`${review.brand} ${review.model}`}
        />
      </div>
      <p className="review__review">{review.review}</p>
      <div className="review__buttons-container">
        <Button
          onClick={() => navigate(`/modify/${review.id}`)}
          className="review__button review__view-button"
        >
          Modify
        </Button>
        <Button
          onClick={deleteAction}
          className="review__button review__delete-button"
        >
          Delete
        </Button>
      </div>
    </DetailReviewStyle>
  );
};

export default DetailReview;
