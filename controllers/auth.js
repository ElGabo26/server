const User = require("../models/user")
const bcrypt= require("bcryptjs")
const jwt= require("../utils/jwt")

function register(req, res){
    const {firstName, lastName,email, password,medID} = req.body
    if(!email) res.status(400).send({msg:"Escriba su email"})
    if(!password) res.status(400).send({msg:"La clave es obligatoria"})
    if(!medID) res.status(400).send({msg:"su medID es obligatorio"})

    const salt=bcrypt.genSaltSync(10);
    const hashPassword=bcrypt.hashSync(password,salt)
    const hashMedId=bcrypt.hashSync(medID,salt)

    const user=new User({
    firstName: firstName,
    lastName: lastName,
    email:email.toLowerCase(),
    password:hashPassword,
    medID:hashMedId  ,
    role: "Doctor",
    activate: true,
    loginAttemps:0
    })

    user.save().then(
        (userStorage) =>res.status(200).send(userStorage)
    ).catch(
        (error)=>{res.status(400).send({msg:"error al crear usuario"})
        console.log(error)}
    );
  
}

function login(req, res){
    const {email, password}=req.body;

    if(!email) res.status(400).send({msg:"email obligatorio"})
    if(!password) res.status(400).send({msg:"clave obligatoria"})

    const emailLowerCase= email.toLowerCase();
    const limit=4
    
    
    const findUser=async ()=>{
        return await User.findOne({email:emailLowerCase})}
    

    const compare= (userStore)=>{
        bcrypt.compare(password,userStore.password,async (error,check)=>{
            if(error){
                res.status(500).send({msg:"error del servidor"})
                
            }else if (!check){
                
                res.status(400).send({msg:"incorrecto"})
                
                userStore.loginAttemps+=1
                await userStore.save()
            }else if(!userStore.activate){
                res.status(401).send({msg:"inexistente"})
                
            }else{
                userStore.loginAttemps=0
                await userStore.save()
                res.status(200).send({
                    accessToken: jwt.createAccessToken(userStore),
                    refreshToken:jwt.createRefreshToken(userStore)
                })
                
            }
        })

       
    }
    
    const handleProcess=async (userStore)=>{
        const count =userStore.loginAttemps
        if (count<limit){
            compare(userStore)
            
            
        }else{
            userStore.activate=false
            await userStore.save()
            res.status(401).send({msg:"demasiados intentos cuenta bloqueada, hable con el administrador"})
            userStore.active=false

        }

    }


    findUser().then(handleProcess).catch(error=>{
        res.status(500).send({msg:"error en el servidor"})
        console.log(error)
    })
}

function refreshAccessToken(req, res ){
    const {token}= req.body;
    if(!token) res.status(400).send({msg:"no existe el token"})

    const {user_id}= jwt.decodedToken(token)
    User.findOne({_id:user_id}).then(
       userStore=>{
        res.status(200).send({accessToken:jwt.createAccessToken(userStore)})
       } 
    ).catch(
        error=>{
            res.status(500).send({msg:"error del servidor"})
        }
    )



}

              



module.exports={ 
    register,
    login,
    refreshAccessToken,
}