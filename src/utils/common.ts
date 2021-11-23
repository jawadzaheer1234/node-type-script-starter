import { hash } from "bcrypt";
import { sign, Secret, SignOptions, verify, Algorithm } from "jsonwebtoken";

const saltRounds = 10;
const environment = process.env;

//Below fuction generate hash from a password
export const generateHash = async (password: string) => {
  const passwordHash = await hash(password, saltRounds);
  return passwordHash;
};

export const getSignedJwt = async (
  body: Record<string, string | boolean>,
  rememberMe: boolean
) => {
  //Sign the JWT token and populate the payload with the user email and id
  const options: SignOptions = {};
  if (rememberMe) {
    options.expiresIn = "30d";
  } else {
    options.expiresIn = "1d";
  }
  const secret: Secret = environment.JWT_SECRET
    ? environment.JWT_SECRET
    : "abc";
  const token = sign({ user: body }, secret, options);
  return token;
};

export const decodeJWT = (data: string, secret: string) => {
  try {
    const payload = verify(data, secret);
    return payload;
  } catch (error) {
    return null;
  }
};
