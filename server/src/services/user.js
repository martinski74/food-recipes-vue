const bcrypt = require("bcrypt");
const { User } = require("../models/User");

const register = async (username, email, password, img) => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error("Email already exists");
  }

  const user = new User({
    username,
    email,
    password: await bcrypt.hash(password, 10),
    img,
  });
  await user.save();
  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Invalid email or password");
  }
  return user;
};

module.exports = {
  register,
  login,
};
