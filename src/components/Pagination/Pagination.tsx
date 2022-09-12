import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import useReviews from "../../hooks/useReviews";
import PaginationStyled from "./Pagination.style";

interface PaginationProps {
  isHome: boolean;
}

const Pagination = ({ isHome }: PaginationProps): JSX.Element => {
  const { loadReviewsByOwner, loadaAllReviews } = useReviews();

  const initialPage = 1;
  const [pageNumber, setPage] = useState(initialPage);

  const paginationPlus = async () => {
    const pagePlus = pageNumber + 1;
    if (
      (!isHome
        ? await loadReviewsByOwner(pagePlus)
        : await loadaAllReviews(pagePlus)) !== 0
    ) {
      setPage(pagePlus);
    }
  };

  const paginationLess = async () => {
    const pageLess = pageNumber - 1;
    if (
      (!isHome
        ? await loadReviewsByOwner(pageLess)
        : await loadaAllReviews(pageLess)) !== 0
    ) {
      setPage(pageLess);
    }
  };

  useEffect(() => {
    !isHome ? loadReviewsByOwner(pageNumber) : loadaAllReviews(pageNumber);
  }, [loadReviewsByOwner, pageNumber, isHome, loadaAllReviews]);

  return (
    <PaginationStyled className="pagination">
      <Button onClick={() => paginationLess()}>
        <FontAwesomeIcon className="jadsbjfdshfbh" icon={faChevronLeft} />
      </Button>
      <span>{`Page ${pageNumber}`}</span>
      <Button className="11111" onClick={() => paginationPlus()}>
        <FontAwesomeIcon icon={faChevronRight} />
      </Button>
    </PaginationStyled>
  );
};

export default Pagination;
