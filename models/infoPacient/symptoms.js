const mongoose= require("mongoose");
const mongoosePaginate = require("mongoose-paginate");


const SymptomsSchema= mongoose.Schema({
    nusea:Boolean,
    frontalHeadache:Boolean,//dolor forntal de cabeza
    visualDisturbance:Boolean,// vision anormal
    epigastricPain:Boolean, //dolor en cuadrante superior derecho 
    chestPain:Boolean,//dolor de pecho
    otherSymptoms:String,//otros sintomas
    comments:String,
    pcient: Number,
    creationDate:Date,
    pacientName:{
        type: String,
        required: true
    },
    pacientCi:{
        type: String,
        required: true
    },
    pacient:String,
    doctor:{
        type: String,
        required: true
    },
    creationDate:{
        type: Date,
        required:true
    },
    creationYear:String,
    creationMonth:String,
    creationDay:String
});
SymptomsSchema.plugin(mongoosePaginate)
module.exports=mongoose.model("Sintomas",SymptomsSchema)