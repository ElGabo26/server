const Hematologic = require("../../models/infoPacient/hematologic")
const Patient =require("../../models/pacient")

async function registerHematologic(req,res){
  const{id}=req.params
  const {user_id} =req.user
  const date=new Date()
  const hematologic=new Hematologic({...req.body})

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
  
  hematologic.pacientName=`${infoPatient.firstName} ${infoPatient.firstLastName}`
  hematologic.pacientCi=`${infoPatient.ciNumber}`
  hematologic.pacient=id
  hematologic.creationDate=date.getTime()
  hematologic.creationYear=date.getYear()
  hematologic.creationMonth=date.getMonth()
  hematologic.creationDay=date.getDay()
  hematologic.doctor=user_id

  
  await hematologic.save().then(
      hematologicStored=>{res.status(200).send({hematologicStored})}
  ).catch(
      error=>{
          res.status(400).send({msg:"error al crear el archivo"})
      }
  )
}
}

function getHematologics(req,res){//econtrar los archivos de Hematologic por mes, año o todos

    const { page = 1, limit = 10 } = req.query;
    const {field=undefined,value=undefined}=req.query;
  
  const params=new Object()
  params[field]=value
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };
  

  Hematologic.paginate(params, options, (error, courses) => {
    if (error) {
      res.status(400).send({ msg: "Error al obtener los archivos" });
    } else {
      res.status(200).send(courses);
    }
  });
    
}

function getHematologic(req, res){
  const {id}=req.params
  Hematologic.findById(id).then(result=>{
    res.status(200).send({result})
  }).catch(
    error=>{res.status(400).send({msg:"Archivo no encontrado"})}
  )
}

async function updateHematologic(req,res){

  const{id}=req.params
  const{user_id}=req.user
  const data=req.body
  

  const file = await Hematologic.findById(id).then(
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
    await Hematologic.findByIdAndUpdate(id,data).then(
      result=>{
        res.status(200).send({msg:"archivo actualizado"})
      }
    ).catch(
      error=>{res.status(400).send({msg:"error al actualizar el archivo"})}
    )
  }
}

async function deleteHematologic(req,res){
  
    const {user_id}=req.user
    const {id}=req.params
    const file=await Hematologic.findById(id).then(
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
      await Hematologic.findByIdAndDelete(id).then(
        result=>{res.status(200).send({msg:`el archivo del paciente ${file.pacientName} ha sido eliminado`})}
      ).catch(
        error=>{res.status(400).send({msg:"archivo no eliminado"})}
      )
    }
 
}

module.exports={
    registerHematologic,
    getHematologics,
    getHematologic,
    updateHematologic,
    deleteHematologic
}