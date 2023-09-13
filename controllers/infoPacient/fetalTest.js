const FetalTest = require("../../models/infoPacient/fetalTest")
const Patient =require("../../models/pacient")

async function registerFetalTest(req,res){
  const{id}=req.params
  const {user_id} =req.user
  const date=new Date()
  const fetalTest=new FetalTest({...req.body})

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
  
  fetalTest.pacientName=`${infoPatient.firstName} ${infoPatient.firstLastName}`
  fetalTest.pacientCi=`${infoPatient.ciNumber}`
  fetalTest.pacient=id
  fetalTest.creationDate=date.getTime()
  fetalTest.creationYear=date.getYear()
  fetalTest.creationMonth=date.getMonth()
  fetalTest.creationDay=date.getDay()
  fetalTest.doctor=user_id

  
  await fetalTest.save().then(
      fetalTestStored=>{res.status(200).send({fetalTestStored})}
  ).catch(
      error=>{
          res.status(400).send({msg:"error al crear el archivo"})
      }
  )
}
}

function getFetalTests(req,res){//econtrar los archivos de FetalTest por mes, año o todos

    const { page = 1, limit = 10 } = req.query;
    const {field=undefined,value=undefined}=req.query;
  
    const params=new Object()
    params[field]=value
    const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };
  

  FetalTest.paginate(params, options, (error, courses) => {
    if (error) {
      res.status(400).send({ msg: "Error al obtener los archivos" });
    } else {
      res.status(200).send(courses);
    }
  });
    
}

function getFetalTest(req, res){
  const {id}=req.params
  FetalTest.findById(id).then(result=>{
    res.status(200).send({result})
  }).catch(
    error=>{res.status(400).send({msg:"Archivo no encontrado"})}
  )
}

async function updateFetalTest(req,res){

  const{id}=req.params
  const{user_id}=req.user
  const data=req.body
  

  const file = await FetalTest.findById(id).then(
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
    await FetalTest.findByIdAndUpdate(id,data).then(
      result=>{
        res.status(200).send({msg:"archivo actualizado"})
      }
    ).catch(
      error=>{res.status(400).send({msg:"error al actualizar el archivo"})}
    )
  }
}

async function deleteFetalTest(req,res){
  
    const {user_id}=req.user
    const {id}=req.params
    const file=await FetalTest.findById(id).then(
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
      await FetalTest.findByIdAndDelete(id).then(
        result=>{res.status(200).send({msg:`el archivo del paciente ${file.pacientName} ha sido eliminado`})}
      ).catch(
        error=>{res.status(400).send({msg:"archivo no eliminado"})}
      )
    }
 
}

module.exports={
    registerFetalTest,
    getFetalTests,
    getFetalTest,
    updateFetalTest,
    deleteFetalTest
}