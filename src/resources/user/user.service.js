const { User } = require('./user.model');
const bcrypt = require('bcrypt');
require('dotenv').config()
const saltRounds = process.env.SALT_ROUNDS;

require('dotenv').config()

exports.getAll = async () => {

    try {
        const users = await User.find().select('-password');
        return users
    } catch (error) {
        throw new Error(error)
    }

};

exports.getById = async (id) => {
    try {
        const users = await User.findById(id).select('-password');
        return users
    } catch (error) {
        throw new Error(error)
    }
};


exports.find_by_email = async (email) => {

    try {
        const users = await User.findOne({"email":email});
        return users
    } catch (error) {
        throw new Error(error)
    }

};

exports.create_user = async (data) => {

    try {
            await bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(data.password, salt, function(err, hash) {
                    data.password = hash;
                });
            });

            const new_user = new User(data)
            await new_user.save()
    
            return new_user
        } catch (error) {
            throw new Error(error)
        }
    
};