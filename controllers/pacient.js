const {verifyAdmin}= require("../utils/sudoDocgtor")
const Pacient = require("../models/pacient")

async function createPacient(req,res){
    const {user_id}=req.user
    
    const patient=new Pacient({...req.body})
    patient.doctor=user_id
    patient.creationDate= new Date().getTime()
    
    await patient.save().then(
        data=>{res.status(200).send(data)}
    ).catch(
        error=>{
            console.log(error)
            res.status(400).send({msg:"error en la base"})}
    )
           
        
}

async function getPacients(req, res){
    
    const {field=undefined,value=undefined}=req.query;
    const params=new Object()
    params[field]=value

   
    
    const response =await Pacient.find(params).sort({field:-1}).then(patients=>{
        return patients
        
    }).catch(error =>{res.status(400).send({msg:"error dataBase"})})

    if(!response){
        res.status(400).send({msg:"error en busqueda"})
    }else{
        res.status(200).send(response)
    }

}

async function getPacient(req, res){
    const {user_id}= req.user
    const {id}=req.params
     if(!verifyAdmin(user_id)){
    
        const response =await Pacient.find({$and:[{doctor:user_id},{_id:id}]}).then(patient=>{
        return patient
        
        }).catch(
            error =>{res.status(400).send({msg:"Error base de datos"})}
            )

            
    }else if (verifyAdmin(user_id)){

        const response =await Pacient.findById(id).then(patient=>{
            return patient
            
            }).catch(
                error =>{res.status(400).send({msg:"Error base de datos"})}
                )
            
                if(!response|| response.length===0){
                    res.status(400).send({msg:"usuario no existente"})
                }else{
                    res.status(200).send(response)}

    }else{
        res.status(400).send({msg:"paciente no encontrado"})
    }

}

async function updatePacient(req, res){
    const {user_id} = req.user
    const {id}=req.params
    const dataUpdate=req.body
    
    const verify=verifyAdmin(user_id)
    

    if(verify){
        await Pacient.findByIdAndUpdate({_id:id},dataUpdate).then(
            data=>res.status(200).send({msg:"paciente actualizado",dataUpdate})
        ).catch(
            error=>{
            res.status(400).send({msg:"error al actualizar el paciaente"})}
        )
    }else{
        filter={$and:[{_id:id},{doctor:user_id}]}
        await Pacient.findOneAndUpdate(filter,dataUpdate).then(
            data=>{res.status(200).send({msg:"usuario actualizado"})}
        ).catch(
           error=>{res.status(400).send({msg:"error base de datos"})} 
        )
    }

}

async function deletePacient(req, res){
    const {user_id}= req.user
    const {id}=req.params
    const patient=await Pacient.findOne({$and:[{_id:id},{doctor:user_id}]}).then(
        data=>{
            
            return data
}
    ).catch(
        error=>{res.status(400).send({msg:"error en la base de datos"})}
    )
    
   if(!patient){
     res.status(401).send({msg:"No tiene autorización para eliminar el usuario"})
   }else{
        await Pacient.findByIdAndDelete(id).then(
            data=>{res.status(200).send({msg:"Paciente eliminado"})}
        ).catch(
            error =>{res.status(400).send({msg:"Error en la base de datos"})}
        )
   }

}





module.exports={
    createPacient,
    getPacients,
    getPacient,
    updatePacient,
    deletePacient

}