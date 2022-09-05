import { useState } from "react";
import useUser from "../../hooks/useUser";
import { ILoginState } from "../../types/User";
import { paswordsChecker } from "../../utils/formsCheckers";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const SignUp = (): JSX.Element => {
  const initialState: ILoginState = {
    userName: "",
    email: "",
    password: "",
    passwordRepeat: "",
  };

  const [validated, setValidated] = useState(false);

  const [user, setUser] = useState(initialState);
  const { signUp } = useUser();

  const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity() || !paswordsChecker(user)) {
      event.stopPropagation();
      setValidated(true);
    } else {
      signUp({
        userName: user.userName,
        password: user.password,
        email: user.email,
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
      className="form"
      noValidate
      validated={validated}
      onSubmit={(event) => {
        handleClick(event);
      }}
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

      <Form.Group className="mb-3" controlId="Email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          required
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Enter your email"
          value={user.email}
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid email.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="Pasword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={user.password}
        />
        <Form.Control.Feedback type="invalid">
          Please provide a password.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="PasswordR">
        <Form.Label>Repeat password</Form.Label>
        <Form.Control
          required
          value={user.passwordRepeat}
          name="passwordRepeat"
          onChange={handleChange}
          type="password"
          placeholder="Repeat your password"
        />
        <Form.Control.Feedback type="invalid">
          Different passswords
        </Form.Control.Feedback>
      </Form.Group>
      <Button
        className="col mt-4 btn btn-primary form__button"
        variant="primary"
        type="submit"
      >
        Sign up
      </Button>
    </Form>
  );
};

export default SignUp;
