const { validationResult } = require('express-validator/check')

exports.getPosts = (req,res,next) => {
    res.status(200).json({
        posts: [{
            _id: '1',
            title: 'First Page',
            content: 'This is the first post!',
            imageUrl: 'images/duck.jpg',
            creator: {
                name: 'Iza'
            },
            createdAt: new Date()
        }]
    });
}

exports.createPost = (req,res,next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty){
        return res.status(222).json({
            message: 'Validation failed, entered data is incorrect',
            errors: errors.array()
        })
    }
    const title = req.body.title;
    const content = req.body.content;
    
    res.status(201).json({
        message: 'Post created successfuly!',
        post: {
            _id: new Date().toISOString(),
            title: title,
            content: content,
            creator: {
                name: 'Iza'
            },
            createdAt: new Date()
        }
    });
};