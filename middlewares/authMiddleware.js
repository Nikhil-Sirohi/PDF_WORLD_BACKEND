import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
  try {
    const decoded = jwt.verify(token, "193747234729ABHH");
    req.user = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};
module.exports = protect;
