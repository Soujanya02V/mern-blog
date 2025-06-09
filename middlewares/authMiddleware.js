import jwt from "jsonwebtoken";
import authModel from "../models/authModel.js";

const checkIsUserAuthenticated = async (req, res, next) => {
  let token
  const { authorization } = req.headers;
  console.log("Authorization Header:", authorization);  // 🔍 debug

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      const {userID} = jwt.verify(token, "soujanya");  
      
       
      
      req.user = await authModel.findById(userID).select("-password");
      
       next()
      


      
      
    } catch (error) {
      
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }
};

export default checkIsUserAuthenticated;
