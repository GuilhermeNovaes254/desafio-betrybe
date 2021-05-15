const HttpStatus = require("http-status-codes");
require('dotenv').config();
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {

    try{
    
        token = req.header('Authorization');
        if(!token) return res.status(HttpStatus.UNAUTHORIZED).send({"message":"Token não encontrado"})

        const decoded_payload = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        console.log(decoded_payload);
    
        next();
    
    }catch(error){
        return res.status(HttpStatus.UNAUTHORIZED).send({"mensage":"Token expirado ou não válido"})
    }
    
}