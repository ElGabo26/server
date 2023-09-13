const Demography = require("../../models/infoPacient/demography")
const Patient =require("../../models/pacient")

async function registerDemography(req,res){
  const{id}=req.params
  const {user_id} =req.user
  const date=new Date()
  const demography=new Demography({...req.body})

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
  
  demography.pacientName=`${infoPatient.firstName} ${infoPatient.firstLastName}`
  demography.pacientCi=`${infoPatient.ciNumber}`
  demography.pacient=id
  demography.creationDate=date.getTime()
  demography.creationYear=date.getYear()
  demography.creationMonth=date.getMonth()
  demography.creationDay=date.getDay()
  demography.doctor=user_id

  
  await demography.save().then(
      demographyStored=>{res.status(200).send({demographyStored})}
  ).catch(
      error=>{
          res.status(400).send({msg:"error al crear el archivo"})
      }
  )
}
}

function getDemographys(req,res){//econtrar los archivos de Demography por mes, año o todos

    const { page = 1, limit = 10 } = req.query;
    const {field=undefined,value=undefined}=req.query;
  
  const params=new Object()
  params[field]=value
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };
  

  Demography.paginate(params, options, (error, courses) => {
    if (error) {
      res.status(400).send({ msg: "Error al obtener los archivos" });
    } else {
      res.status(200).send(courses);
    }
  });
    
}

function getDemography(req, res){
  const {id}=req.params
  Demography.findById(id).then(result=>{
    res.status(200).send({result})
  }).catch(
    error=>{res.status(400).send({msg:"Archivo no encontrado"})}
  )
}

async function updateDemography(req,res){

  const{id}=req.params
  const{user_id}=req.user
  const data=req.body
  

  const file = await Demography.findById(id).then(
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
    await Demography.findByIdAndUpdate(id,data).then(
      result=>{
        res.status(200).send({msg:"archivo actualizado"})
      }
    ).catch(
      error=>{res.status(400).send({msg:"error al actualizar el archivo"})}
    )
  }
}

async function deleteDemography(req,res){
  
    const {user_id}=req.user
    const {id}=req.params
    const file=await Demography.findById(id).then(
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
      await Demography.findByIdAndDelete(id).then(
        result=>{res.status(200).send({msg:`el archivo del paciente ${file.pacientName} ha sido eliminado`})}
      ).catch(
        error=>{res.status(400).send({msg:"archivo no eliminado"})}
      )
    }
 
}

module.exports={
    registerDemography,
    getDemographys,
    getDemography,
    updateDemography,
    deleteDemography
}