// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import { TOKEN_SECRET } from "../config.js";
// import { createAccessToken } from "../../common/jwt.js";
import CN_Auth from "./auth.negocio.js";
// import { token } from "morgan";

const objAuth = new CN_Auth();

export const register = async (req, res) => {
  try {
    const data = req.body;

    const result = await objAuth.register(data);

    if (result.message != 'success') return res.json(result);

    res.cookie("token", result.token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.redirect(303, '/empresa');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const data = req.body;

    const result = await objAuth.login(data);

    if (result.message != 'success') return res.json(result);

    res.cookie("token", result.token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });
    res.redirect(303, '/empresa');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// export const verifyToken = async (req, res) => {
//   const { token } = req.cookies;
//   if (!token) return res.send(false);

//   jwt.verify(token, TOKEN_SECRET, async (error, user) => {
//     if (error) return res.sendStatus(401);

//     const userFound = await User.findById(user.id);
//     if (!userFound) return res.sendStatus(401);

//     return res.json({
//       id: userFound._id,
//       username: userFound.username,
//       email: userFound.email,
//     });
//   });
// };

export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

// export const view = async (req, res) => {
//   res.render('auth/login', {layout: false});
// }

export const view = async (req, res) => {
  res.render('layouts/new', {layout: false});
}