const Renal = require("../../models/infoPacient/renalSingns")
const Patient =require("../../models/pacient")

async function registerRenal(req,res){
  const{id}=req.params
  const {user_id} =req.user
  const date=new Date()
  const renal=new Renal({...req.body})

  const infoPatient= await Patient.findById(id).then(
    result=>{
      
      return result}
  ).catch(
    error=>{
      return undefined}
  )
  
  if(!infoPatient){
    res.status(400).send({msg:"paciente no encontrado"})
  }else{
  
  renal.pacientName=`${infoPatient.firstName} ${infoPatient.firstLastName}`
  renal.pacientCi=`${infoPatient.ciNumber}`
  renal.pacient=id
  renal.creationDate=date.getTime()
  renal.creationYear=date.getYear()
  renal.creationMonth=date.getMonth()
  renal.creationDay=date.getDay()
  renal.doctor=user_id

  
  await renal.save().then(
      renalStored=>{res.status(200).send({renalStored})}
  ).catch(
      error=>{
          res.status(400).send({msg:"error al crear el archivo"})
      }
  )
}
}

function getRenals(req,res){//econtrar los archivos de Renal por mes, año o todos

    const { page = 1, limit = 10 } = req.query;
    const {field=undefined,value=undefined}=req.query;
  
  const params=new Object()
  params[field]=value
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };
  

  Renal.paginate(params, options, (error, courses) => {
    if (error) {
      res.status(400).send({ msg: "Error al obtener los archivos" });
    } else {
      res.status(200).send(courses);
    }
  });
    
}

function getRenal(req, res){
  const {id}=req.params
  Renal.findById(id).then(result=>{
    res.status(200).send({result})
  }).catch(
    error=>{res.status(400).send({msg:"Archivo no encontrado"})}
  )
}

async function updateRenal(req,res){

  const{id}=req.params
  const{user_id}=req.user
  const data=req.body
  

  const file = await Renal.findById(id).then(
    result=>{return result}
  ).catch(
    error=>{
      console.log(error)
      return undefined}
  )
  
  if(!file){
    res.status(400).send({msg:"archivo no encontrado"})
  }else if (file.doctor !== user_id){
    res.status(400).send({msg:"Usuario no autorizado para modificar el archivo"})
  }else{
    await Renal.findByIdAndUpdate(id,data).then(
      result=>{
        res.status(200).send({msg:"archivo actualizado"})
      }
    ).catch(
      error=>{res.status(400).send({msg:"error al actualizar el archivo"})}
    )
  }
}

async function deleteRenal(req,res){
  
    const {user_id}=req.user
    const {id}=req.params
    const file=await Renal.findById(id).then(
      result=>{
        return result
      }
    ).catch(
      error=>{
        return undefined
      }
    )
    if(!file){
      res.status(500).send({msg:"error base de datos"})
    }else if (file.doctor !== user_id){
      res.status(401).send({msg:"El archivo solo puede ser eliminado por su autor"})
    }else{
      await Renal.findByIdAndDelete(id).then(
        result=>{res.status(200).send({msg:`el archivo del paciente ${file.pacientName} ha sido eliminado`})}
      ).catch(
        error=>{res.status(400).send({msg:"archivo no eliminado"})}
      )
    }
 
}

module.exports={
    registerRenal,
    getRenals,
    getRenal,
    updateRenal,
    deleteRenal
}