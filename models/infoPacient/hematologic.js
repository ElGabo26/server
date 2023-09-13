const mongoose= require("mongoose");
const mongoosePaginate = require("mongoose-paginate");


const hematologicalSchema= mongoose.Schema({
    leucocyte:Number,
    platelet:Number,
    meanPlateletVolum:Number,
    thromboplatinTime: Number,
    fibrinogen: Number,
    examn:String,
    pacient: Number,
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
hematologicalSchema.plugin(mongoosePaginate)

module.exports=mongoose.model("Hematologic",hematologicalSchema)