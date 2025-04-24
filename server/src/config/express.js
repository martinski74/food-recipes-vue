const express = require("express");
const { session } = require("../middlewares/session");
const cors = require("cors");
const secret = "jwt secret";
require("../models/User");
require("../models/Recipe");

const configExpress = (app) => {
  app.use(cors());
  app.use(session());
  app.use("/uploads", express.static("uploads"));

  app.use(express.json());
};
module.exports = { configExpress };
