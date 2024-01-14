var jwt = require("jsonwebtoken");

const fetchUser = (req, res, next) => {
  //Get the user from the jwt token and add Id to req object
  const token = req.header("auth-token");
  if (!token) {
    res
      .status(401)
      .send({ error: "Please authenticate using valid token null token" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using valid token" });
  }
};
module.exports = fetchUser;
