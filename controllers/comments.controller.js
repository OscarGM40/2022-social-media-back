import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getComments = (req, res) => {
  const query = `SELECT c.*, u.id AS userId, name, profilePic FROM comments AS c JOIN users AS u ON (c.userId = u.id)  WHERE c.postId = ? ORDER BY c.createdAt DESC`;

  // ojo que el postId viene en los queryParams (/comments?postId=4) <- los comentarios del post 4
  db.query(query, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addComment = (req,res) => {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json("Not logged in!");
    }

    jwt.verify(token, process.env.SEED, (err, userInfo) => {
      if (err) {
        console.log({ err });
        return res.status(403).json("Token is not valid");
      }
      const query = "INSERT INTO comments (`description`,`userId`,`postId`,`createdAt`) VALUES (?)";
      const values = 
      [
        req.body.desc,
        userInfo.id,
        req.body.postId,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      ]

      // ojo que el id viene en userInfo.id
      db.query(query, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
    });
}