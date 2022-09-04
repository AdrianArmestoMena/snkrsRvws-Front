import { Button, Form } from "react-bootstrap";
import Formstyle from "../../stylesUtils/Forms.style";

const ReviewFrom = (): JSX.Element => {
  return (
    <Formstyle>
      <Form noValidate validated={false} className="form">
        <Form.Group className="mb-3" controlId="Name">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            name="Brand"
            type="text"
            placeholder="Nike, Adidas, Jordan..."
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Pasword">
          <Form.Label>Model</Form.Label>
          <Form.Control
            required
            name="model"
            type="text"
            placeholder="Jordan 11, jordan 1 low travis scoot, etc"
          />
        </Form.Group>
        <Form.Group controlId="Picture" className="mb-3">
          <Form.Label>Kick's picture</Form.Label>
          <Form.Control name="picture" required type="file" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Your review</Form.Label>
          <Form.Control required as="textarea" rows={3} />
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

export default ReviewFrom;
