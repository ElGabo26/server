const mongoose= require("mongoose");
const mongoosePaginate = require("mongoose-paginate");


const HepaticTestSchema=mongoose.Schema({
    aspartate:Number,//U/L
    alanine:Number,//U/L
    midpoint:Number,//U/L
    bilirubin:Number,//molL
    albumin:Number,//g/L
    glucose:Number,// mmolL
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

HepaticTestSchema.plugin(mongoosePaginate)

module.exports=mongoose.model("HepaticTest",HepaticTestSchema)