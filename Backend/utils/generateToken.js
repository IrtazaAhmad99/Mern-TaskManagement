const jwt = require("jsonwebtoken");
const ENV = require("../environment.js")

exports.generateToken = (user)=>{
return jwt.sign(
    {id:user._id, role:user.role}, 
    ENV.JWT_SECRET, 
    {expiresIn:"7d"})
}