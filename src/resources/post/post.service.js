const { Post } = require('./post.model');

require('dotenv').config()

exports.getAll = async () => {

    try {
        const users = await Post.find().populate('user');
        return users
    } catch (error) {
        throw new Error(error)
    }

};

exports.getById = async (id) => {

    try {
        const users = await Post.findById(id).populate('user');
        return users
    } catch (error) {
        throw new Error(error)
    }

};

exports.create_post = async (data) => {

    try {
        const new_post = new Post(data)
        await new_post.save()

        return new_post
    } catch (error) {
        throw new Error(error)
    }
    
};

exports.findAndUpdate = async (id,new_data) => {

    try {
        await Post.findByIdAndUpdate(id, new_data, { new: true });

        return new_post
    } catch (error) {
        throw new Error(error)
    }
    
};

exports.search = async (criteria) => {
    try {
        let found = Post.find({ "title": { "$regex": criteria, "$options": "i" } }).populate('user');
        if (found.length == 0) found = Post.find({ "content": { "$regex": criteria, "$options": "i" } }).populate('user');
        
        return found
    } catch (error) {
        throw new Error(error)
    }
};
