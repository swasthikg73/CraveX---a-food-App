import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.json({
      success: false,
      message: "Not authorized Login Again",
    });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {}; // Initiolize before use or will ger error  Cannot set properties of undefined (setting 'userId')
    req.user = token_decode;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export default authMiddleware;
