const mongoose= require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const fetalTestSchema=mongoose.Schema({
    heartRate:String,
    weight:Number,//categoria de percentil
    abdominalCircumference:Number,//percentil
    file:String,
    pacient:String,
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
})
fetalTestSchema.plugin(mongoosePaginate)
module.exports=mongoose.model("FetalTests",fetalTestSchema)