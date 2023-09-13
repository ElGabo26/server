const Symptoms = require("../../models/infoPacient/symptoms")
const Patient =require("../../models/pacient")

async function registerSymptoms(req,res){
  const{id}=req.params
  const {user_id} =req.user
  const date=new Date()
  const symptoms=new Symptoms({...req.body})

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
  
  symptoms.pacientName=`${infoPatient.firstName} ${infoPatient.firstLastName}`
  symptoms.pacientCi=`${infoPatient.ciNumber}`
  symptoms.pacient=id
  symptoms.creationDate=date.getTime()
  symptoms.creationYear=date.getYear()
  symptoms.creationMonth=date.getMonth()
  symptoms.creationDay=date.getDay()
  symptoms.doctor=user_id

  
  await symptoms.save().then(
      symptomsStored=>{res.status(200).send({symptomsStored})}
  ).catch(
      error=>{
          res.status(400).send({msg:"error al crear el archivo"})
      }
  )
}
}

function getSymptomss(req,res){//econtrar los archivos de Symptoms por mes, año o todos

    const { page = 1, limit = 10 } = req.query;
    const {field=undefined,value=undefined}=req.query;
  
  const params=new Object()
  params[field]=value
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };
  

  Symptoms.paginate(params, options, (error, courses) => {
    if (error) {
      res.status(400).send({ msg: "Error al obtener los archivos" });
    } else {
      res.status(200).send(courses);
    }
  });
    
}

function getSymptoms(req, res){
  const {id}=req.params
  Symptoms.findById(id).then(result=>{
    res.status(200).send({result})
  }).catch(
    error=>{res.status(400).send({msg:"Archivo no encontrado"})}
  )
}

async function updateSymptoms(req,res){

  const{id}=req.params
  const{user_id}=req.user
  const data=req.body
  

  const file = await Symptoms.findById(id).then(
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
    await Symptoms.findByIdAndUpdate(id,data).then(
      result=>{
        res.status(200).send({msg:"archivo actualizado"})
      }
    ).catch(
      error=>{res.status(400).send({msg:"error al actualizar el archivo"})}
    )
  }
}

async function deleteSymptoms(req,res){
  
    const {user_id}=req.user
    const {id}=req.params
    const file=await Symptoms.findById(id).then(
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
      await Symptoms.findByIdAndDelete(id).then(
        result=>{res.status(200).send({msg:`el archivo del paciente ${file.pacientName} ha sido eliminado`})}
      ).catch(
        error=>{res.status(400).send({msg:"archivo no eliminado"})}
      )
    }
 
}

module.exports={
    registerSymptoms,
    getSymptomss,
    getSymptoms,
    updateSymptoms,
    deleteSymptoms
}