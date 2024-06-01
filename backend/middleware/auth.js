import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  // Extract the Authorization header
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    console.log("No authorization header");
    return res.status(401).json({
      success: false,
      message: "Not Authorized. Please Login",
    });
  }

  // Split the header to get the token part
  const token = authHeader.split(" ")[1];
  if (!token) {
    console.log("No token found in authorization header");
    return res.status(401).json({
      success: false,
      message: "Not Authorized. Please Login",
    });
  }

  try {
    // Verify the token
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user ID to request body
    req.body.userId = decodeToken.id;
    next();
  } catch (error) {
    console.log("Token verification failed:", error);
    res.status(403).json({ success: false, message: "Invalid token" });
  }
};

export default authMiddleware;