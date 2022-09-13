import FilterForm from "../../components/FilterForm/FilterForm";
import ReviewsList from "../../components/ReviewsList/ReviewsList";
import YourReviewsPageStyle from "./YourReviewsPage.style";

const YourReviewsPage = (): JSX.Element => {
  return (
    <YourReviewsPageStyle>
      <FilterForm isHome={false} />
      <h2 className="tittle">Your Reviews</h2>
      <ReviewsList isHome={false} />
    </YourReviewsPageStyle>
  );
};

export default YourReviewsPage;
