const HttpStatus = require("http-status-codes");
const postService = require('./post.service');
const { Post } = require('./post.model');

// router.get('/', postController.getAll);
// router.post('/', postController.create);
// router.get('/:id', postController.getById);
// router.put('/:id', postController.update);
// router.get('/search', postController.search);
// router.delete('/:id', postController.delete);

exports.getById =async (req, res) => {
    const posts = await postService.getById();
    return posts;
};

exports.getAll = async (req, res) => {

    const posts = await postService.getAll();
    return posts;
};


exports.create = async (req, res) => {

    let {title, content} = req.body;

    if(!title) return res.status(HttpStatus.BAD_REQUEST).send({"message": "\"title\" is required"});
    if(!content) return res.status(HttpStatus.BAD_REQUEST).send({"message": "\"content\" is required"});

    const id = idFromHeader(req);
    const new_element = {"title":title, "content":content, "userId":id};
    await postService.create(new_element);

    res.status(HttpStatus.OK).send(new_element);
};

exports.update = async (req, res) => {

    let { id } = req.params;
    let {title, content} = req.body;

    let new_data = {"userId":id}
    if(title != undefined) new_data.title = title;
    if(content != undefined) new_data.content = content;

    // if id do not exists, it will create a new one post.
    await postService.findAndUpdate(id, new_data);
    
    res.status(HttpStatus.OK).send(new_data);
};

exports.search = async (req, res) => {

    let { q } = req.query;
    const result = await postService.search(q);

    res.status(HttpStatus.OK).send(result);
 
};

exports.delete = async (req, res) => {

    let { id } = req.params;
    id_req = idFromHeader(req);

    const post = await postService.getById(id);

    if(!post) return res.status(HttpStatus.BAD_REQUEST).send({"message": "Post não existe"});

    if(post.userId.id != id_req) return res.status(HttpStatus.NO_CONTENT);
    
    await post.remove();
    res.status(HttpStatus.NO_CONTENT); 
};

const idFromHeader = (req) => {
    
    token = req.header('Authorization');
    const decoded_payload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    return decoded_payload._id;

}