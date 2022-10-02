const { validateToken } = require("../config/token");

function validateAuth(req, res, next) {
  const token = req.cookies.token;

  if (!token) return res.sendStatus(401);

  const { user } = validateToken(token);
  if (!user) return res.sendStatus(401);

  req.user = user;

  next();
}

function validateAdmin(req, res, next) {
  if (req.user.isAdmin) {
    next();
  } else {
    return res
      .status(401)
      .send("You need to be an administrator to perform this task");
  }
}
module.exports = { validateAuth, validateAdmin };
