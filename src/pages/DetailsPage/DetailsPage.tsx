import DetailReview from "../../components/DetailReview/DetailReview";
import { useAppSelector } from "../../store/hooks";
import YourReviewsPageStyle from "../YourReviewsPage/YourReviewsPage.style";

const DetailsPage = (): JSX.Element => {
  const { id } = useAppSelector((state) => state.users);
  return (
    <YourReviewsPageStyle>
      <h2 className="tittle">Your Reviews</h2>
      <DetailReview userId={id} />
    </YourReviewsPageStyle>
  );
};

export default DetailsPage;
