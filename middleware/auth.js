const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next){
    const token = req.header('x-auth-token');

    if(!token){
        res.status(401).json({message: "No token. Unauthorized"});
    }
    try{
        const decoded = jwt.verify(token,config.get('jwtSecret'));
        req.user = decoded.user;

        next();
    }catch(err){
        res.status(201).json({message: "Token is not valid"});
    }
}

