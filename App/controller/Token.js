const jwt = require('jsonwebtoken');
const jwtsecret = 'anfksfderlkld9343kl';
const authenticateToken = (req,res,next) => {
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    if(token===null){
        
        res.json({"err":"Token not match",status_code:400})
    }
    else {
        jwt.verify(token,jwtsecret,(err,data)=>{
            if(err){
                res.json({"err":"Token incorrect",status_code:400})
            }
            else {
                next();
            }
        })
    }
}

module.exports = authenticateToken;