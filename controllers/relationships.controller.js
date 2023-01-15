import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getRelationships = (req, res) => {
  const query = `SELECT followerUserId FROM relationships WHERE followedUserId = ?`;
// console.log(query)
  db.query(query, [req.query.followedUserId], (err, data) => {
    if (err) return res.status(500).json(err);
    console.log({data})
    return res.status(200).json(data.map((r) => r.followerUserId));
  });
};

export const addRelationship = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not logged in!");
  }

  jwt.verify(token, process.env.SEED, (err, userInfo) => {
    if (err) {
      console.log({ err });
      return res.status(403).json("Token is not valid");
    }
    const query = "INSERT INTO relationships (`followerUserId`,`followedUserId`) VALUES (?)";
    const values = [userInfo.id, req.body.userId];

    // ojo que el id viene en userInfo.id
    db.query(query, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Following");
    });
  });
};

export const deleteRelationship = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not logged in!");
  }

  jwt.verify(token, process.env.SEED, (err, userInfo) => {
    if (err) {
      console.log({ err });
      return res.status(403).json("Token is not valid");
    }
  const query = "DELETE FROM relationships WHERE `followerUserId` = (?) AND `followedUserId` = (?)";
 
    // ojo que el id viene en userInfo.id
    db.query(query, [userInfo.id, req.query.userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Unfollowing");
    });
  });
};
