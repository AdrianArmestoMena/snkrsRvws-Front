import { Button, Form } from "react-bootstrap";
import LoginStyle from "./Login.style";

const Login = (): JSX.Element => {
  return (
    <LoginStyle>
      <h2 className="action-call">
        Join the {<span className="action-call__outstanding">SnkrsRvws</span>}{" "}
        communty
      </h2>
      <Form className="form" noValidate>
        <Form.Group className="mb-3" controlId="Name">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            name="userName"
            type="text"
            placeholder="Enter your name"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please choose a username.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Pasword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            name="password"
            type="password"
            placeholder="Password"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a password.
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          className="col mt-4 btn btn-primary form__button"
          variant="primary"
          type="submit"
        >
          Login
        </Button>
      </Form>
    </LoginStyle>
  );
};

export default Login;
