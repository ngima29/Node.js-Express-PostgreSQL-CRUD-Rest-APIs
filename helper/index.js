const jwt = require('jsonwebtoken');
require("dotenv").config();

// create token
const createToken = (user)=>{
    const payload = {
        id: user.id,
        email: user.email
      };
      const options = {
        expiresIn: '3d'
      };
      return jwt.sign(payload, process.env.JWT_SECRET_KEY, options);

}
/// verify tokrn
const verifyToken =  (token) => {
    return  jwt.verify(token, process.env.JWT_SECRET_KEY);
  };
module.exports={
    createToken, verifyToken 
}