const { Post } = require('./post.model');
const { User } = require('../user/user.model');
require('dotenv').config()

exports.getAll = async () => {

    try {

        const posts = await Post.find().populate('userId').select('-__v');
        return posts
    } catch (error) {
        throw new Error(error)
    }

};

exports.getById = async (id) => {

    try {
        const post = await Post.findById(id).populate('userId').select('-__v');
        return post
    } catch (error) {
        throw new Error(error)
    }

};

exports.create = async (data) => {

    try {
        const new_post = new Post(data)
        console.log(new_post);
        await new_post.save()

        return new_post
    } catch (error) {
        throw new Error(error)
    }
    
};

exports.findAndUpdate = async (id,new_data) => {

    try {        
        new_data.updated = new Date();
        const new_post = await Post.findByIdAndUpdate(id, new_data, { new: false }).populate('userId').select('-__v');

        return new_post
    } catch (error) {
        throw new Error(error)
    }
    
};

exports.search = async (q) => {
    try {

        const criteria = json(q)
        if(!criteria) return false;
        let found = await Post.find(criteria).populate('userId').select('-__v');
        
        return found
    } catch (error) {
        throw new Error(error)
    }
};

const json = (function (raw) {
    try {
        return JSON.parse(raw);
    } catch (err) {
        return false;
    }
})