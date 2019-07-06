const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
    const autoHeader = req.get('Authorization');
    if(!autoHeader){
        const error = new Error('Not authenticated.')
        error.statusCode = 401;
        throw error;
    }
    const token = autoHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'somesupersecretsecret')
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if(!decodedToken){
        const error = new Error('Not authenticated.')
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
}