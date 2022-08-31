import jwt_decode from "jwt-decode";
import { UserToken } from "../types/User";

const getTokenUser = (token: string): UserToken => jwt_decode(token);

export default getTokenUser;
