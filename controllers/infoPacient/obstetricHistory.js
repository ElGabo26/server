const Obstetric = require("../../models/infoPacient/obstetricHistory")
const Patient =require("../../models/pacient")

async function registerObstetric(req,res){
  const{id}=req.params
  const {user_id} =req.user
  const date=new Date()
  const obstetric=new Obstetric({...req.body})

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
  
  obstetric.pacientName=`${infoPatient.firstName} ${infoPatient.firstLastName}`
  obstetric.pacientCi=`${infoPatient.ciNumber}`
  obstetric.pacient=id
  obstetric.creationDate=date.getTime()
  obstetric.creationYear=date.getYear()
  obstetric.creationMonth=date.getMonth()
  obstetric.creationDay=date.getDay()
  obstetric.doctor=user_id

  
  await obstetric.save().then(
      obstetricStored=>{res.status(200).send({obstetricStored})}
  ).catch(
      error=>{
          res.status(400).send({msg:"error al crear el archivo"})
      }
  )
}
}

function getObstetrics(req,res){//econtrar los archivos de Obstetric por mes, año o todos

    const { page = 1, limit = 10 } = req.query;
    const {field=undefined,value=undefined}=req.query;
  
  const params=new Object()
  params[field]=value
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };
  

  Obstetric.paginate(params, options, (error, courses) => {
    if (error) {
      res.status(400).send({ msg: "Error al obtener los archivos" });
    } else {
      res.status(200).send(courses);
    }
  });
    
}

function getObstetric(req, res){
  const {id}=req.params
  Obstetric.findById(id).then(result=>{
    res.status(200).send({result})
  }).catch(
    error=>{res.status(400).send({msg:"Archivo no encontrado"})}
  )
}

async function updateObstetric(req,res){

  const{id}=req.params
  const{user_id}=req.user
  const data=req.body
  

  const file = await Obstetric.findById(id).then(
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
    await Obstetric.findByIdAndUpdate(id,data).then(
      result=>{
        res.status(200).send({msg:"archivo actualizado"})
      }
    ).catch(
      error=>{res.status(400).send({msg:"error al actualizar el archivo"})}
    )
  }
}

async function deleteObstetric(req,res){
  
    const {user_id}=req.user
    const {id}=req.params
    const file=await Obstetric.findById(id).then(
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
      await Obstetric.findByIdAndDelete(id).then(
        result=>{res.status(200).send({msg:`el archivo del paciente ${file.pacientName} ha sido eliminado`})}
      ).catch(
        error=>{res.status(400).send({msg:"archivo no eliminado"})}
      )
    }
 
}

module.exports={
    registerObstetric,
    getObstetrics,
    getObstetric,
    updateObstetric,
    deleteObstetric
}