import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getLikes = (req, res) => {
   const query = `SELECT userId FROM likes WHERE postId = ?`;

   // ojo que el postId viene en los queryParams (/likes?postId=4) <- los likes del post 4
   db.query(query, [req.query.postId], (err, data) => {
     if (err) return res.status(500).json(err);
     return res.status(200).json(data.map(like => like.userId));
   });
};
