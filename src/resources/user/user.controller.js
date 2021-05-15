
const HttpStatus = require("http-status-codes");
const userService = require('./user.service');
const jwt = require("jsonwebtoken");
const { User } = require('../user/user.model');
require('dotenv').config();

exports.create = async(req, res) => {

    let user = await userService.find_by_email(req.body.email);

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

