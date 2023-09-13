const User= require("../models/user")
async function verifyAdmin(host_id){
    const user = await User.findById(host_id).then(
        userStored=>{
            return userStored
        }).catch(error=>{
            res.status(400).send({msg:"Error base de datos"})
    })

    if(user.role ==="Admin"){
        return true
    }else{
        return false
    }
}

module.exports={
    verifyAdmin
}