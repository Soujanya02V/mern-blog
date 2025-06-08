import authModel from "../models/authModel.js"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
class AuthController
{
    static userRegister = async (req, res) =>{
        const {username, email, password} = req.body;
        try {
            if(username && email && password){
                const isUser = await authModel.findOne({email: email})
                if(!isUser){
                    //hashing
                    const genSalt = await bcryptjs.genSalt(10);
                    const hashedPassword = await bcryptjs.hash(password, genSalt);

                    const newUser = new authModel({
                        username,
                        email,
                        password:hashedPassword
                    })
                     const saveUser = await newUser.save();
                     if (saveUser){
                        return res.status(200).json({message: "registration successfull"});
                     }

                }else{
                     return res.status(400).json({message: "already registered"});
                }
            }
            else{
                return res.status(400).json({message: "all fields are required"});
            }
            
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }
    static userLogin = async (req, res) =>{
       const {email,password} = req.body;
       try {
        if(email && password){
            const isEmail = await authModel.findOne({email: email});
            if(isEmail){
                if(isEmail.email === email && await bcryptjs.compare(password, isEmail.password)){
                    //tokens
                    const token = jwt.sign({userID: isEmail._id}, "soujanya",{
                        expiresIn: "2d"
                    });
                    return res.status(200).json({
                        message:"login successfull",
                        token,
                        name: isEmail.username,
                    })
                }
                else{
                    return res.status(400).json({message: "wrong credentials"});
                }


            }else{
                return res.status(400).json({message: "email not found"});
            }

        }else{
             return res.status(400).json({message: "all fields are required"});
        }
        
       } catch (error) {
          return res.status(400).json({message: error.message});
       }
    }
}

export default AuthController;