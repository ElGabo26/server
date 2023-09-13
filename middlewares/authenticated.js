const jwt= require("../utils/jwt");

function asureAuth(req, res, next){

    
    if(!req.headers.authorization){
        res.status(403).send({msg:"no tiene autentificacion"})
    }
    const token= req.headers.authorization.replace("Bearer ","")   

    
    try {
        const payload=jwt.decodedToken(token)
        const currentDate =new  Date().getTime()

        const{exp}=payload.exp; 

        if(exp<=currentDate){
            res.status(400).send({msg:"El token expiró"})
        }
        req.user=payload
        next();

    } catch (error) {
        
        res.status(400).send({msg:"token invalido"})
    }

   
}

module.exports={
    asureAuth
}