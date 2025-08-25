const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
    const token = req.header('Authorization')?.split(' ')[1];

    if(!token)
    {
        return res.status(401).json({message:'Access Denied'});
    }

    try{
        req.user = jwt.verify(token,process.env.JWT_SECRET);
        next();
    }
    catch
    {
        return res.status(400).json({message:"Invalid Credential"});
    }
};