class AuthController
{
    static userRegister = async (req, res) =>{
        res.send("user registration")
    }
    static userLogin = async (req, res) =>{
       res.send("user login") 
    }
}

export default AuthController;