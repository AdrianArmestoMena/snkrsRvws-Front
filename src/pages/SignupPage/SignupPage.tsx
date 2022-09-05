import SignUp from "../../components/SignUp/SignUp";
import Formstyle from "../../stylesUtils/Forms.style";

const SignupPage = (): JSX.Element => {
  return (
    <Formstyle>
      <h2 className="action-call">
        Join the {<span className="action-call__outstanding">SnkrsRvws</span>}{" "}
        community
      </h2>
      <SignUp />
    </Formstyle>
  );
};

export default SignupPage;
