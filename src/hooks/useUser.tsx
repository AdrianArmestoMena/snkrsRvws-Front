import axios from "axios";
import { SignUp } from "../types/User";

const apiUrl = process.env.REACT_APP_API_URL;

const useUser = () => {
  const signUp = async ({ userName, password, email }: SignUp) => {
    try {
      await axios.post(`${apiUrl}/users/signUp`, {
        userName,
        password,
        email,
      });
    } catch (error) {}
  };

  return { signUp };
};

export default useUser;
