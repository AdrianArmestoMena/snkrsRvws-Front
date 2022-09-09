import DetailReview from "../../components/DetailReview/DetailReview";
import YourReviewsPageStyle from "../YourReviewsPage/YourReviewsPage.style";

const DetailsPage = (): JSX.Element => {
  return (
    <YourReviewsPageStyle>
      <h2 className="tittle">Your Reviews</h2>
      <DetailReview />
    </YourReviewsPageStyle>
  );
};

export default DetailsPage;
