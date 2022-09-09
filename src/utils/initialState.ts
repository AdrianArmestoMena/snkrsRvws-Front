import jwtDecode from "jwt-decode";
const emptyUser = {
  id: "",
  userName: "",
};
const initialState = () => {
  const token = localStorage.getItem("token") as string;

  if (token) {
    return jwtDecode(token);
  }

  return emptyUser;
};

export default initialState;
