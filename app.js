const path = require('path');


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4')
const multer = require('multer');


const feedRoutes = require('./routes/feed')

const app = express();

//app.use(bodyParser.urlencoded());

// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'images')
//     },
//     filename: (req,file,cb) => {
//         cb(null, new Date().toISOString() + '-' + file.originalname)
//     }
// })

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4())
    }
});

const fileFilter = (req,file,cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.use(bodyParser.json());
app.use(multer({storage: storage, fileFilter: fileFilter}).single('image'))
app.use('/images',express.static(path.join(__dirname, 'images')));

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes)

app.use((error, req, res, next)=>{
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message: message})
})

mongoose.connect('mongodb+srv://kozak:53352190@cluster0-ypi1l.mongodb.net/shop').then(result=>{
    app.listen(8080);
}).catch(err=>{
    console.log(err)
})