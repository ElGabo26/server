const Hepatic = require("../../models/infoPacient/hepaticTest")
const Patient =require("../../models/pacient")

async function registerHepatic(req,res){
  const{id}=req.params
  const {user_id} =req.user
  const date=new Date()
  const hepatic=new Hepatic({...req.body})

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
  
  hepatic.pacientName=`${infoPatient.firstName} ${infoPatient.firstLastName}`
  hepatic.pacientCi=`${infoPatient.ciNumber}`
  hepatic.pacient=id
  hepatic.creationDate=date.getTime()
  hepatic.creationYear=date.getYear()
  hepatic.creationMonth=date.getMonth()
  hepatic.creationDay=date.getDay()
  hepatic.doctor=user_id

  
  await hepatic.save().then(
      hepaticStored=>{res.status(200).send({hepaticStored})}
  ).catch(
      error=>{
          res.status(400).send({msg:"error al crear el archivo"})
      }
  )
}
}

function getHepatics(req,res){//econtrar los archivos de Hepatic por mes, año o todos

    const { page = 1, limit = 10 } = req.query;
    const {field=undefined,value=undefined}=req.query;
  
  const params=new Object()
  params[field]=value
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };
  

  Hepatic.paginate(params, options, (error, courses) => {
    if (error) {
      res.status(400).send({ msg: "Error al obtener los archivos" });
    } else {
      res.status(200).send(courses);
    }
  });
    
}

function getHepatic(req, res){
  const {id}=req.params
  Hepatic.findById(id).then(result=>{
    res.status(200).send({result})
  }).catch(
    error=>{res.status(400).send({msg:"Archivo no encontrado"})}
  )
}

async function updateHepatic(req,res){

  const{id}=req.params
  const{user_id}=req.user
  const data=req.body
  

  const file = await Hepatic.findById(id).then(
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
    await Hepatic.findByIdAndUpdate(id,data).then(
      result=>{
        res.status(200).send({msg:"archivo actualizado"})
      }
    ).catch(
      error=>{res.status(400).send({msg:"error al actualizar el archivo"})}
    )
  }
}

async function deleteHepatic(req,res){
  
    const {user_id}=req.user
    const {id}=req.params
    const file=await Hepatic.findById(id).then(
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
      await Hepatic.findByIdAndDelete(id).then(
        result=>{res.status(200).send({msg:`el archivo del paciente ${file.pacientName} ha sido eliminado`})}
      ).catch(
        error=>{res.status(400).send({msg:"archivo no eliminado"})}
      )
    }
 
}

module.exports={
    registerHepatic,
    getHepatics,
    getHepatic,
    updateHepatic,
    deleteHepatic
}