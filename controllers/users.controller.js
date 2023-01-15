import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const query = `SELECT * FROM users WHERE id = ?`;

  db.query(query, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...rest } = data[0];
    return res.status(200).json(rest);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not logged in!");
  }

  jwt.verify(token, process.env.SEED, (err, userInfo) => {
    if (err) {
      console.log({ err });
      return res.status(403).json("Token is not valid");
    }
    const query =
      "UPDATE users SET `name`=?,`city`=?,`website`=?,`profilePic`=?,`coverPic`=? WHERE id = ?";

      const values = [
        req.body.name,
        req.body.city,
        req.body.website,
        req.body.profilePic,
        req.body.coverPic,
        userInfo.id
      ]
    db.query(query, values, (err, data) => {
      if (err) return res.status(500).json(err);
      if(data.affectedRows > 0){
        return res.status(200).json("Updated!");
      }
      return res.status(403).json("You can only update your account")
    });
  });
};
