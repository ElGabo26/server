const Cardio = require("../../models/infoPacient/cardioSigns")
const Patient =require("../../models/pacient")

async function registerCardio(req,res){
    const{id}=req.params
    const {user_id} =req.user
    const date=new Date()
    const cardio=new Cardio({...req.body})

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
    
    cardio.pacientName=`${infoPatient.firstName} ${infoPatient.firstLastName}`
    cardio.pacientCi=`${infoPatient.ciNumber}`
    cardio.pacient=id
    cardio.creationDate=date.getTime()
    cardio.creationYear=date.getYear()
    cardio.creationMonth=date.getMonth()
    cardio.creationDay=date.getDay()
    cardio.doctor=user_id

    
    await cardio.save().then(
        cardioStored=>{res.status(200).send({cardioStored})}
    ).catch(
        error=>{
            res.status(400).send({msg:"error al crear el archivo"})
        }
    )
  }
}

function getCardios(req,res){//econtrar los archivos de cardio por mes, año o todos

    const { page = 1, limit = 5 } = req.query;
    const {field=null,value=null}=req.query;
  
  const params=new Object()
  params[field]=value
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };
  

  Cardio.paginate(params, options, (error, courses) => {
    if (error) {
      res.status(400).send({ msg: "Error al obtener los cursos" });
    } else {
      res.status(200).send(courses);
    }
  });
    
}

function getCardio(req, res){
  const {id}=req.params
  Cardio.findById(id).then(result=>{
    res.status(200).send({result})
  }).catch(
    error=>{res.status(400).send({msg:"Archivo no encontrado"})}
  )
}

async function updateCardio(req,res){

  const{id}=req.params
  const{user_id}=req.user
  const data=req.body
  

  const file = await Cardio.findById(id).then(
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
    await Cardio.findByIdAndUpdate(id,data).then(
      result=>{
        res.status(200).send({msg:"archivo actualizado"})
      }
    ).catch(
      error=>{res.status(400).send({msg:"error al actualizar el archivo"})}
    )
  }
}

async function deleteCardio(req,res){
  const {user_id}=req.user
  const {id}=req.params
  const file=await Cardio.findById(id).then(
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
    await Cardio.findByIdAndDelete(id).then(
      result=>{res.status(200).send({msg:`el archivo del paciente ${file.pacientName} ha sido eliminado`})}
    ).catch(
      error=>{res.status(400).send({msg:"archivo no eliminado"})}
    )
  }
  
}

module.exports={
    registerCardio,
    getCardios,
    getCardio,
    updateCardio,
    deleteCardio
}