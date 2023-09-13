const mongoose= require("mongoose");
const mongoosePaginate = require("mongoose-paginate");


const cardioSchema= mongoose.Schema({
    diastolicPressure: Number, //mm Hg
    systolicPressure: Number, // mm Hg
    meanArterialPressure: Number, //mm Hg
    spO2:Number, //%
    file:String,

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
    creationDay:String,

    
    
});

cardioSchema.plugin(mongoosePaginate)

module.exports= mongoose.model("Respiratorio",cardioSchema)