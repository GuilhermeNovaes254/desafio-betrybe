const HttpStatus = require("http-status-codes");

exports.auth = (req, res, next) => {

    try{
        token = req.header('Authorization');
        if(!token) return res.status(HttpStatus.UNAUTHORIZED).send({"message":"Token não encontrado"})
        const decoded_payload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        next();
    }catch(error){
        return res.send(HttpStatus.UNAUTHORIZED).send({"mensage":"Token expirado ou não válido"})
    }

    
}