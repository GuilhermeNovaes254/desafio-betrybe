const HttpStatus = require("http-status-codes");
const postService = require('./post.service');
const jwt = require("jsonwebtoken");
const {
    Post
} = require('./post.model');


exports.getById = async (req, res) => {
    let {
        id
    } = req.params;
    const posts = await postService.getById(id);

    res.status(HttpStatus.OK).send(posts);
};

exports.getAll = async (req, res) => {

    const posts = await postService.getAll();
    res.status(HttpStatus.OK).send(posts);
};


exports.create = async (req, res) => {

    let {
        title,
        content
    } = req.body;

    if (!title) return res.status(HttpStatus.BAD_REQUEST).send({"message": "\"title\" is required"});
    if (!content) return res.status(HttpStatus.BAD_REQUEST).send({"message": "\"content\" is required"});

    const id = idFromHeader(req);
    const new_element = {
        "title": title,
        "content": content,
        "userId": id
    };
    await postService.create(new_element);

    res.status(HttpStatus.CREATED).send(new_element);
};

exports.update = async (req, res) => {
    let id_req = idFromHeader(req);
    let {id} = req.params
    let {title,content} = req.body;

    let new_data = {"userId": id_req}
    
    if (title != undefined) new_data.title = title;
    if (content != undefined) new_data.content = content;

    // if id do not exists, it will create a new one post.
    await postService.findAndUpdate(id, new_data);

    res.status(HttpStatus.OK).send(new_data);
};

exports.search = async (req, res) => {

    const result = await postService.search(req.query.q);

    if(!result) return res.status(HttpStatus.BAD_REQUEST).send({'message':"formato incorreto dos dados"})

    res.status(HttpStatus.OK).send(result);
};

exports.delete = async (req, res) => {

    let {
        id
    } = req.params;
    id_req = idFromHeader(req);

    const post = await postService.getById(id);

    if (!post) return res.status(HttpStatus.BAD_REQUEST).send({"message": "Post não existe"});
    console.log(post.userId, id_req);
    if (post.userId != id_req) return res.status(HttpStatus.BAD_REQUEST).send({"message": "Usuário não autor do post"});

    post.remove();
    return res.status(HttpStatus.NO_CONTENT).send({"message": "Usuário deletado"});
};

const idFromHeader = (req) => {

    token = req.header('Authorization');
    const decoded_payload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    return decoded_payload._id;

}
