import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import useReviews from "../../hooks/useReviews";
import { useAppSelector } from "../../store/hooks";
import Formstyle from "../../stylesUtils/Forms.style";

const formData = new FormData();

const ReviewForm = (): JSX.Element => {
  const { id } = useAppSelector((state) => state.users);

  const initialState = {
    brand: "",
    model: "",
    review: "",
    picture: "",
  };

  const [validated, setValidated] = useState(false);
  const [review, setReview] = useState(initialState);

  const { createReview } = useReviews();

  const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.stopPropagation();
      setValidated(true);
    } else {
      event.preventDefault();
      formData.append("review", JSON.stringify({ ...review, owner: id }));
      await createReview(formData);
      setReview(initialState);
      setValidated(false);
    }
  };

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    formData.append("picture", event.target.files![0]);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReview({ ...review, [event.target.name]: event.target.value });
  };

  return (
    <Formstyle>
      <Form
        noValidate
        validated={validated}
        className="form"
        onSubmit={(event) => {
          handleClick(event);
        }}
      >
        <Form.Group className="mb-3" controlId="Name">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={review.brand}
            name="brand"
            type="text"
            placeholder="Nike, Adidas, Jordan..."
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Pasword">
          <Form.Label>Model</Form.Label>
          <Form.Control
            value={review.model}
            required
            onChange={handleChange}
            name="model"
            type="text"
            placeholder="Jordan 11, jordan 1 low travis scoot, etc"
          />
        </Form.Group>
        <Form.Group controlId="Picture" className="mb-3">
          <Form.Label>Kick's picture</Form.Label>
          <Form.Control onChange={onChangeFile} name="picture" type="file" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Your review</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={review.review}
            name="review"
            required
            as="textarea"
            rows={3}
          />
        </Form.Group>
        <Button
          className="col mt-4 btn btn-primary form__button"
          variant="primary"
          type="submit"
        >
          Craete Review
        </Button>
      </Form>
    </Formstyle>
  );
};

export default ReviewForm;
