import ReviewsList from "../../components/ReviewsList/ReviewsList";
import YourReviewsPageStyle from "./YourReviewsPage.style";

const YourReviewsPage = (): JSX.Element => {
  return (
    <YourReviewsPageStyle>
      <h2 className="tittle">Your Reviews</h2>
      <ReviewsList />
    </YourReviewsPageStyle>
  );
};

export default YourReviewsPage;
