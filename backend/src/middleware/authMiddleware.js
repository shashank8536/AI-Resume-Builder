import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    console.log("RAW HEADER:", token);

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    console.log("FINAL TOKEN:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED:", decoded);

    req.user = decoded;
    next();

  } catch (error) {
    console.log("ERROR:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;