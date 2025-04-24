const { Router } = require("express");
const path = require("path");
const { body, validationResult } = require("express-validator");
const { register, login } = require("../services/user");
const { generateToken } = require("../services/token");
const { upload } = require("../middlewares/upload");

const userRouter = Router();

userRouter.post(
  "/users/register",
  upload.single("img"),
  body("email").trim().isEmail().withMessage("Invalid email format"),
  body("password").trim(),
  async (req, res) => {
    const { username, email, password } = req.body;
    const img = req.file ? "uploads/" + req.file.filename : ""; // Get the file path from the request

    console.log("img", req.body);
    try {
      const result = validationResult(req);

      if (result.errors.length) {
        throw result.errors;
      }

      const user = await register(username, email, password, img);
      const token = generateToken(user);

      res.json({ user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

userRouter.post(
  "/users/login",
  body("email").trim(),
  body("password").trim(),
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await login(email, password);
      const token = generateToken(user);

      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token,
        img: user.img,
      });
    } catch (error) {
      res.status(403).json({ message: "Incorrect email or password!" });
    }
  }
);

userRouter.get("/users/logout", async (req, res) => {
  res.json({ message: "Logged out successfully" });
});

module.exports = { userRouter };
