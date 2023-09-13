const mongoose= require("mongoose");
const mongoosePaginate = require("mongoose-paginate");


const RenalSignsSchema = mongoose.Schema({
    Dipstick:String,
    DipstickC:Number,
    urineProtein:Number,
    creatinine:Number,
    uricAcid:Number,
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


RenalSignsSchema.plugin(mongoosePaginate)
module.exports=mongoose.model("RenalSigns",RenalSignsSchema)