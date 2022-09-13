import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import useReviews from "../../hooks/useReviews";
import FilterFormStyle from "./FilterForm.style";
interface FilterFormProps {
  isHome: boolean;
}
const FilterForm = ({ isHome }: FilterFormProps): JSX.Element => {
  const initialState: { brand: string } = {
    brand: "",
  };
  const { loadReviewsByBrand, loadReviewsByBrandbyOwner } = useReviews();
  const [brand, setBrand] = useState(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBrand({ ...brand, [event.target.name]: event.target.value });
  };
  const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    isHome
      ? await loadReviewsByBrand(brand.brand)
      : loadReviewsByBrandbyOwner(brand.brand);
    setBrand(initialState);
  };

  return (
    <FilterFormStyle className="filter-section">
      <Form
        onSubmit={(event) => {
          handleClick(event);
        }}
        className="filter-form"
      >
        <h2 className="filter-form__title">Search</h2>
        <Form.Group className="mb-3" controlId="Pasword">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            required
            onChange={handleChange}
            name="brand"
            type="text"
            placeholder="NIKE, ADIDAS, JORDAN, NB.."
          />
        </Form.Group>
        <div className="filter-form__button-containter">
          <Button
            disabled={brand.brand === ""}
            className="col mt-4 btn btn-primary filter-form__button"
            variant="primary"
            type="submit"
          >
            SEARCH
          </Button>
        </div>
      </Form>
    </FilterFormStyle>
  );
};

export default FilterForm;
