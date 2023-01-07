import jwt from "jsonwebtoken";

export const generateJwt = (id) =>
  jwt.sign({ id: id }, process.env.SEED, {
    expiresIn: "20h",
  });
