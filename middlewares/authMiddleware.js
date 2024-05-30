import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    next("Auth Failed");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    next("Auth Failed");
  }
};

export default userAuth;
export const logout = (req, res) => {
  // Clear the JWT token from client-side storage (e.g., cookies, local storage)
  res.clearCookie("token"); // Clear token cookie, if using cookies for token storage

  // Optionally, you can also invalidate the token on the server-side (e.g., using a blacklist)
  // You can maintain a blacklist of tokens in a database or in-memory cache

  res.status(200).json({ message: "Logout successful" });
};
