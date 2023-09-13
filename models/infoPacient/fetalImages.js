//ecografia (hipervolemia= exceso de volumen del feto, tambien se ve placenta y liquido amniotico)
//radiografia pero no esta  indicado
//tomografia axial computarizada TAC
// resonancia magnetica
const mongoose= require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const fetalImageSchema =mongoose.Schema({
    ecography:String,
    
    radiography:String,
    
    tomography:String,
    
    resonance:String,
    
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
})

fetalImageSchema.plugin(mongoosePaginate)

module.exports=mongoose.model('FetalImages',fetalImageSchema)