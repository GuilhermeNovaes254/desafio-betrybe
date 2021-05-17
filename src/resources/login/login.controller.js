
const HttpStatus = require("http-status-codes");
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const userService = require('../user/user.service');
const { User } = require('../user/user.model');

exports.signup = async (req, res) => {

    let {password, email} = req.body;

    if(!email) return res.status(HttpStatus.BAD_REQUEST).send({"message":"\"email\" is required"});
    if(email.length == 0) res.status(HttpStatus.BAD_REQUEST).send({"message": "\"email\" is not allowed to be empty"});

    if(!password) return res.status(HttpStatus.BAD_REQUEST).send({"message":"\"password\" is required"});
    if(password.length == 0) res.status(HttpStatus.BAD_REQUEST).send({"message": "\"password\" is not allowed to be empty"});
    
    const user = await userService.find_by_email(email);

    if(!user) return res.status(HttpStatus.BAD_REQUEST).send({"message":"Campo inválido"});
    
    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid) return res.status(HttpStatus.BAD_REQUEST).send({"message":"Campo inválido"});
    
    const token = user.generateUserToken();

    res.status(HttpStatus.OK).send({"token": token});

};