import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import useUser from "../../hooks/useUser";
import { LoginUser } from "../../types/User";

const Login = (): JSX.Element => {
  const initialState: LoginUser = {
    userName: "",
    password: "",
  };

  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState(initialState);

  const { logIn } = useUser();

  const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      event.stopPropagation();
      setValidated(true);
    } else {
      await logIn({
        userName: user.userName,
        password: user.password,
      });
      setUser(initialState);
      setValidated(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={(event) => {
        handleClick(event);
      }}
      className="form"
    >
      <Form.Group className="mb-3" controlId="Name">
        <Form.Label>User Name</Form.Label>
        <Form.Control
          name="userName"
          onChange={handleChange}
          value={user.userName}
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
          onChange={handleChange}
          value={user.password}
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
  );
};

export default Login;
