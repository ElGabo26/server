const mongoose= require("mongoose");



const UserSchema= mongoose.Schema({
    firstName: String,
    lastName: String,
    email:{
       type: String,
       required:true,
       unique: true},
    password:{
        type:String,
        required: true,
        
         },
    medID:{
        type: String,
        required: true,
        unique: true
        
    },
    role: String,
    activate: Boolean,
    loginAttemps:Number
 
    

})

module.exports= mongoose.model("Doctores",UserSchema)