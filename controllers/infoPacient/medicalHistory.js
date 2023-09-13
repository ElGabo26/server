const History = require("../../models/infoPacient/medicalHistory")
const Patient =require("../../models/pacient")

async function registerHistory(req,res){
  const{id}=req.params
  const {user_id} =req.user
  const date=new Date()
  const history=new History({...req.body})

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
  
  history.pacientName=`${infoPatient.firstName} ${infoPatient.firstLastName}`
  history.pacientCi=`${infoPatient.ciNumber}`
  history.pacient=id
  history.creationDate=date.getTime()
  history.creationYear=date.getYear()
  history.creationMonth=date.getMonth()
  history.creationDay=date.getDay()
  history.doctor=user_id

  
  await history.save().then(
      historyStored=>{res.status(200).send({historyStored})}
  ).catch(
      error=>{
          res.status(400).send({msg:"error al crear el archivo"})
      }
  )
}
}

function getHistorys(req,res){//econtrar los archivos de History por mes, año o todos

    const { page = 1, limit = 10 } = req.query;
    const {field=undefined,value=undefined}=req.query;
  
  const params=new Object()
  params[field]=value
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };
  

  History.paginate(params, options, (error, courses) => {
    if (error) {
      res.status(400).send({ msg: "Error al obtener los archivos" });
    } else {
      res.status(200).send(courses);
    }
  });
    
}

function getHistory(req, res){
  const {id}=req.params
  History.findById(id).then(result=>{
    res.status(200).send({result})
  }).catch(
    error=>{res.status(400).send({msg:"Archivo no encontrado"})}
  )
}

async function updateHistory(req,res){

  const{id}=req.params
  const{user_id}=req.user
  const data=req.body
  

  const file = await History.findById(id).then(
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
    await History.findByIdAndUpdate(id,data).then(
      result=>{
        res.status(200).send({msg:"archivo actualizado"})
      }
    ).catch(
      error=>{res.status(400).send({msg:"error al actualizar el archivo"})}
    )
  }
}

async function deleteHistory(req,res){
  
    const {user_id}=req.user
    const {id}=req.params
    const file=await History.findById(id).then(
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
      await History.findByIdAndDelete(id).then(
        result=>{res.status(200).send({msg:`el archivo del paciente ${file.pacientName} ha sido eliminado`})}
      ).catch(
        error=>{res.status(400).send({msg:"archivo no eliminado"})}
      )
    }
 
}

module.exports={
    registerHistory,
    getHistorys,
    getHistory,
    updateHistory,
    deleteHistory
}