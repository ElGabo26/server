const mongoose= require("mongoose");
const PacientSchema= mongoose.Schema({
    firstName: String,
    firstLastName:String,
    secondLastName:String,
    ciNumber:{
        type:String,
        required:true,
        unique: true
    },
    numberClinicalHistory:{
        type:String,
        required:true,
        unique: true
    },//por lo general numero de cedula del paciente 
    dateBirth: Date,
    creationDate:Date,
    doctor:String// medID
    
})

module.exports= mongoose.model("Pacientes",PacientSchema)
