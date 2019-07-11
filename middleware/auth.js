const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
    const autoHeader = req.get('Authorization');
    if(!autoHeader){
        req.isAuth = false;
        return next();
    }
    const token = autoHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'somesupersecretsecret')
    } catch (err) {
        req.isAuth = false;
        return next();
    }
    if(!decodedToken){
        req.isAuth = false;
        return next();
    }
    req.userId = decodedToken.userId;
    req.isAuth = true;
    next();
}