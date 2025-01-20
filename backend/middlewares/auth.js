import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({
      success: false,
      message: "You are not authorized! Login again.",
    });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_TOKEN);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log("Error in authMiddleware: ", error);
    res.json({ success: false, message: "Something went wrong!" });
  }
};

export default authMiddleware;
