export interface IUser {
  userName: string;
  email: string;
  password: string;
}

export interface ILoginState extends IUser {
  passwordRepeat: string;
}

export interface UserToken {
  id: string;
  userName: string;
  iat: number;
}

export interface LoginUser {
  userName: string;
  password: string;
}

export interface LoginResponse {
  user: {
    token: string;
  };
}
