import jwt from "jsonwebtoken";

type JwtPayload = {
  user_id: string;
};

export function create_token(
  user_id: string,
  secret: string,
  expiresIn: number,
): string {
  return jwt.sign({ user_id }, secret, {
    expiresIn,
  });
}

export function verify_token(token: string, secret: string): JwtPayload | null {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (err) {
    return null;
  }
}
