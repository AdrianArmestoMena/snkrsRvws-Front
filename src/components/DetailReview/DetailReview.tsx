import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import useReviews from "../../hooks/useReviews";
import { useAppSelector } from "../../store/hooks";
import DetailReviewStyle from "./DetailReviews.style";

interface DetailReviewProps {
  userId: string;
}

const DetailReview = ({ userId }: DetailReviewProps): JSX.Element => {
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
      </div>
      <div className="review__image-container">
        <img
          className="review__image"
          height={500}
          src={review.backupImage}
          alt={`${review.brand} ${review.model}`}
        />
      </div>
      <p className="review__review">{review.review}</p>
      {review.owner === userId ? (
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
      ) : (
        <></>
      )}
    </DetailReviewStyle>
  );
};

export default DetailReview;
