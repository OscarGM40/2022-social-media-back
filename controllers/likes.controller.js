import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getLikes = (req, res) => {
   const query = `SELECT userId FROM likes WHERE postId = ?`;

   // ojo que el postId viene en los queryParams (/likes?postId=4) <- los likes del post 4
   db.query(query, [req.query.postId], (err, data) => {
     if (err) return res.status(500).json(err);
     return res.status(200).json(data.map(like => like.userId));
   });
};

export const addLike = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not logged in!");
  }

  jwt.verify(token, process.env.SEED, (err, userInfo) => {
    if (err) {
      console.log({ err });
      return res.status(403).json("Token is not valid");
    }
    const query = "INSERT INTO likes (`userId`,`postId`) VALUES (?)";
    const values = [
      userInfo.id,
      req.body.postId
    ];

    // ojo que el id viene en userInfo.id
    db.query(query, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been liked");
    });
  });
};

export const deleteLike = (req, res) => {
  const token = req.cookies.accessToken;
  
  if (!token) {
    return res.status(401).json("Not logged in!");
  }
  
  jwt.verify(token, process.env.SEED, (err, userInfo) => {
    if (err) {
      console.log({ err });
      return res.status(403).json("Token is not valid");
    }
    const query = "DELETE FROM likes WHERE `userId` = (?) AND `postId` = (?) ";
    console.log({id: userInfo.id,query: req.query.postId})
    // ojo que el id viene en userInfo.id
    db.query(query, [userInfo.id,req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been unliked");
    });
  });
};