import jwt from "jsonwebtoken";

export const verifyJwt = (token) => {
  return jwt.verify(token, process.env.SEED, (err, userInfo) => {
    if (err) {
      console.log({ err });
      return res.status(403).json(err);
    }
    console.log(userInfo);
    return userInfo;
  });
};
