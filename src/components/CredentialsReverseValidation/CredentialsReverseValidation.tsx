import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

interface CredentialsInvalidationProps {
  children: JSX.Element;
}

const CredentialsReverseValidation = ({
  children,
}: CredentialsInvalidationProps) => {
  const user = useAppSelector((state) => state.users.id);
  const navigate = useNavigate();
  const logged = user === "" ? false : true;
  useEffect(() => {
    if (logged) {
      navigate("/your-reviews");
    }
  }, [logged, navigate]);

  return !logged ? children : <></>;
};

export default CredentialsReverseValidation;
