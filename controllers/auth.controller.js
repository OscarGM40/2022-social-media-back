import { db } from "../connect.js";
import { generateJwt } from "../helpers/generateJwt.js";
import { hashPassword } from "../helpers/hashPassword.js";
import { passwordCompareSync } from "../helpers/passwordCompareSync.js";

export const register = (req, res) => {
  const { username, email, password, name } = req.body;
  // check if user exists
  // ojo que un select * devolverá un arreglo
  const query = "SELECT * FROM users WHERE username = ?";

  db.query(query, [username], (err, data) => {
    // si hay un error lo retornamos
    if (err) return res.status(500).json(err);
    // si existe el usuario no podemos registrarlo,es un error tmb
    if (data.length) return res.status(409).json("User already exists");
    // Si llegamos aqui es que hay que crear el usuario
    const hashedPassword = hashPassword(password);

    const query = "INSERT INTO users (`username`,`email`,`password`,`name`) VALUES (?,?,?,?)";

    db.query(query, [username, email, hashedPassword, name], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created");
    });
  });
};

export const login = (req, res) => {
  console.log(req.body)
  const { username } = req.body;
  // de nuevo miramos si el user existe
  // ojo que un select * devolverá un arreglo
  const query = "select * from users where username = ?";

  db.query(query, [username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found");
    // compare passwords
    const passwordsMatch = passwordCompareSync(req.body.password, data[0].password);
    if (!passwordsMatch) {
      return res.status(400).json("Wrong credentials");
    }

    // dejamos la password afuera para el return
    const { password, ...rest } = data[0];
    //si hacen match es él,cual prehistoric,luego creamos el token
    const token = generateJwt(data[0].id);
    return res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      . json(rest);
  });
};
export const logout = (req, res) => {
  return res.clearCookie("accessToken",{
    sameSite:"none",
    secure:true
  }).status(200).json("User has been logged out") 
};
