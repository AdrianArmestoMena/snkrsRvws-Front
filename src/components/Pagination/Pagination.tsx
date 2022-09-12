import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import PaginationStyled from "./Pagination.style";

interface PaginationProps {
  page: number;
  onClickLess: () => void;
  onClickPluss: () => void;
}

const Pagination = ({
  page,
  onClickLess,
  onClickPluss,
}: PaginationProps): JSX.Element => {
  return (
    <PaginationStyled className="pagination">
      <Button onClick={() => onClickLess()}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </Button>
      <span>{`Page ${page}`}</span>
      <Button onClick={() => onClickPluss()}>
        <FontAwesomeIcon icon={faChevronRight} />
      </Button>
    </PaginationStyled>
  );
};

export default Pagination;
