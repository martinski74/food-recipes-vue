const isUser = () => {
  return (req, res, next) => {
    if (!req.user) {
      res.stattus(401).json({ code: 401, message: "Unauthorized" });
    } else {
      next();
    }
  };
};

const isGuest = () => {
  return (req, res, next) => {
    if (req.user) {
      res.redirect("/");
    } else {
      next();
    }
  };
};

module.exports = {
  isUser,
  isGuest,
};
