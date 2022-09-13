import FilterForm from "../../components/FilterForm/FilterForm";
import ReviewsList from "../../components/ReviewsList/ReviewsList";
import YourReviewsPageStyle from "../YourReviewsPage/YourReviewsPage.style";

const HomePage = (): JSX.Element => {
  return (
    <YourReviewsPageStyle>
      <FilterForm isHome={true} />
      <h2 className="tittle">Reviews</h2>
      <ReviewsList isHome={true} />
    </YourReviewsPageStyle>
  );
};

export default HomePage;
