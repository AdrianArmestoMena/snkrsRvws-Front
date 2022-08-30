import { ILoginState } from "../types/User";

export const paswordsChecker = (user: ILoginState) =>
  user.password === user.passwordRepeat ? true : false;
