export interface IUser {
  userName: string;
  email: string;
  password: string;
}
export interface SignUp {
  userName: string;
  password: string;
  email: string;
}

export interface ILoginState extends IUser {
  passwordRepeat: string;
}
