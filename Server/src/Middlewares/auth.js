import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) return res.status(403).send("Access Denied");

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
