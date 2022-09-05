import Login from "../../components/LogIn/LogIn";
import Formstyle from "../../stylesUtils/Forms.style";

const LoginPage = (): JSX.Element => {
  return (
    <Formstyle>
      <h2 className="action-call">
        Join the {<span className="action-call__outstanding">SnkrsRvws</span>}{" "}
        community
      </h2>
      <Login />
    </Formstyle>
  );
};

export default LoginPage;
