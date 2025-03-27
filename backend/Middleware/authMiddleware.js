const jwt=require('jsonwebtoken');

const protect=(req,res,next) => {
    const token=req.header('Authorization')?.split(' ')[1];
    if(!toekn){
        return res.status(401).json({message:"Not Authorized"});
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({message:"Token is not valid"});
    }
};

module.exports=protect;