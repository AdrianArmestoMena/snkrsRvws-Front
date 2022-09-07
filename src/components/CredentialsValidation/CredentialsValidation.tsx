import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

interface CredentialsValidationProps {
  children: JSX.Element;
}

const CredentialsValidation = ({ children }: CredentialsValidationProps) => {
  const user = useAppSelector((state) => state.users.id);
  const navigate = useNavigate();
  const logged = user === "" ? false : true;

  useEffect(() => {
    if (!logged) {
      navigate("/login");
    }
  }, [logged, navigate]);

  return logged ? children : <></>;
};

export default CredentialsValidation;
