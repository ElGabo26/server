const Images= require("../../models/infoPacient/fetalImages")
const Patient =require("../../models/pacient")
const {getPathFile} =require("../../utils/getPathFile")

async function addImage(req, res){
    const {id}=req.params
    const {user_id}=req.user
    const date=new Date()
    const infoPatient=await Patient.findById(id).then(
        result=>{return result}
    ).catch(
        error=>{
            return undefined
        }
    )
    
    if(!infoPatient){
        res.status(400).send({msg:"paciente inexistente"})
    }else{
        const imagenes= new Object()
        const keys=Object.keys(req.files)
        keys.forEach(key=>{
            imagenes[key]=getPathFile(req.files[key])
        })

        const images= new Images({...imagenes})

        images.pacientName=`${infoPatient.firstName} ${infoPatient.firstLastName}`
        images.pacientCi=`${infoPatient.ciNumber}`
        images.pacient=id
        images.creationDate=date.getTime()
        images.creationYear=date.getYear()
        images.creationMonth=date.getMonth()
        images.creationDay=date.getDay()
        images.doctor=user_id

        await images.save().then(
            result=>{res.status(200).send(result)}
        ).catch(
            error=>{res.status(400).send({msg:"error al cargar las imágenes"})}
        )
    }

}

async function getImages(req,res){
    const { page = 1, limit = 10 } = req.query;
    const {field=undefined,value=undefined}=req.query;
  
    const params=new Object()
    params[field]=value
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
    }

    Images.paginate(params, options, (error, courses) => {
        if (error) {
          res.status(400).send({ msg: "Error al obtener los archivos" });
        } else {
          res.status(200).send(courses);
        }
      });
}

async function getImage(req,res){
    const {id}= req.params
    Images.findById(id).then(
        result=>{res.status(200).send({result})}
    ).catch(
        error=>{res.status(400).send({msg:"Archivo inexistente"})}
    )
}

async function updateImage(req,res){
    const{id}=req.params
    const{user_id}=req.user
    const keys =Object.keys(req.files)


  const file = await Images.findById(id).then(
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
    const data= new Object()
    keys.forEach(key=>{
        data[key]=getPathFile(req.files[key])
    })

    await Images.findByIdAndUpdate(id,data).then(
        result=>{res.status(200).send({msg:"Archivo actualizado"})}).catch(
            error=>{res.status(400).send({msg:"error al actualizar el archivo"})}
        )

  }
}

async function deleteImage(req,res){
    const {user_id}=req.user
    const {id}=req.params
    const file=await Images.findById(id).then(
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
      await Images.findByIdAndDelete(id).then(
        result=>{res.status(200).send({msg:`el archivo del paciente ${file.pacientName} ha sido eliminado`})}
      ).catch(
        error=>{res.status(400).send({msg:"archivo no eliminado"})}
      )
    }
}


module.exports={
    addImage,
    getImages,
    getImage,
    updateImage,
    deleteImage
}