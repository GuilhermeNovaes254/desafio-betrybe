
const HttpStatus = require("http-status-codes");
const userService = require('./user.service');
const jwt = require("jsonwebtoken");
const { User } = require('../user/user.model');
require('dotenv').config();

exports.create = async(req, res) => {

    let user = await userService.find_by_email(req.body.email);
    
    if(req.body.password.length < 6) return res.status(HttpStatus.BAD_REQUEST).send({"message":"\"Password\" deve ter no mínimo 6 caracteres"});
    if(req.body.displayName.length < 8) return res.status(HttpStatus.BAD_REQUEST).send({"message":"\"DisplayName\" deve ter no mínimo 8 caracteres"});
    if(!validateEmail(req.body.email)) return res.status(HttpStatus.BAD_REQUEST).send({"message": "E-mail não é válido"});
    if(user) return res.status(HttpStatus.CONFLICT).send({"message": "Usuário já existe"});


    await userService.create_user(req.body);
    user = await userService.find_by_email(req.body.email);

    const token = user.generateUserToken();
 
    return res.status(HttpStatus.OK).send({"token": token});
};

exports.getAll = async(req, res) => {
    let users = await userService.getAll();
    return res.status(HttpStatus.OK).send(users)
};

exports.getById = async(req, res) => {
    let id = req.params.id;
    let user = await userService.getById(id);  
    if(!user) return res.status(HttpStatus.NOT_FOUND).send({"message":"Usuário não existente"})
    
    return res.status(HttpStatus.OK).send(user);
};

exports.delete = async(req, res) => {

    token = req.header('Authorization')
    const decoded_payload = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
    let user = await userService.getById(decoded_payload._id);
    
    await user.remove();

    return res.status(HttpStatus.NO_CONTENT).send({"message": "Usuário deletado"});
};

const validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};