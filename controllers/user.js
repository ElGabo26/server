const bcrypt= require("bcryptjs")
const User= require("../models/user")




async function getDoctor(req,res){
    const {user_id}=req.user
    const response= await User.findById(user_id).then(
        userStore=>{return userStore}
    ).catch(
        error=>{
            res.status(500).send({msg:"error base de datos"})
        }
    )

    if(!response){
        res.status(400).send({msg:"usuario no encontrado"})
    }else{
        res.status(200).send(response)
    }
    
}

async function getDoctors (req, res){
    const {user_id}= req.user
    const {activate}= req.query
    let response = undefined

    const user =await User.findById(user_id).then(
        userStore=>{return userStore}
    ).catch(error=>{res.status(400).send({msg:"error database"})})

    

    if (!user){
        res.status(400).send({msg:"usuario no identificado"})
    }else if(user.role !=="Admin"){
        res.status(401).send({msg:"no tiene permisos"})
    }else if (!activate){
        response= await User.find()
        if(!response){
            res.status(400).send({msg:"error base de datos"})
        }else{
            res.status(200).send(response)
        }
    }else{
        response= await User.find({activate})
        if(!response){
            res.status(400).send({msg:"error base de datos"})
        }else{
            res.status(200).send(response)
        }
    }

    

}

async function createDoctor(req,res){
        
    const {password, medID}= req.body
    const salt=bcrypt.genSaltSync(10);
    const hashPassword=bcrypt.hashSync(password,salt)
    const hashMedId=bcrypt.hashSync(medID,salt)
    const user = new User({...req.body})
    user.password=hashPassword
    user.medID=hashMedId
    user.activate=true
    user.loginAttemps=0

    

   await user.save().then(userStore=>{
        res.status(200).send(userStore)
    }).catch(
        error=>{
            
            res.status(400).send({msg:"error al crear el usuario"})
        }
    )


}

async function updateDoctor(req, res){

    const {user_id}=req.user
    const host= await User.findById(user_id)
    if(!host){
        res.status(400).send({msg:"error base de datos"})
    }else if(host.role !=="Admin"){
        res.status(401).send({msg:"no tiene permisos"})
    }else{
        const {id}=req.params
        const userData=req.body
        if(userData.password){
            const salt=bcrypt.genSaltSync(10);
            const hashPassword=bcrypt.hashSync(userData.password,salt)
            userData.password=hashPassword
        }
        if (userData.medID){
            const salt=bcrypt.genSaltSync(10);
            const hashMedId=bcrypt.hashSync(userData.medID,salt)
            userData.medID= hashMedId
        }

        
      

        await User.findByIdAndUpdate({_id:id},userData).then(userUpdate =>{
            res.status(200).send({msg:"usuario actualizado",userUpdate})}
        ).catch(error=>{
            console.log(error)
            res.status(400).send({msg:"error al actualizar el usuario"})
        })
    }

   
}

async function deleteDoctor(req,res){
    const {id}=req.params
    await User.findByIdAndDelete(id).then(
        deluser=>{res.status(200).send({msg:`${deluser.firstName} ha sido eliminado`})}
    ).catch(
        error=>{res.status(400).send({msg:"error en el databse"})}
    )

}

module.exports={
    getDoctor,
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor,
}