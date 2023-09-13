const mongoose= require("mongoose");
const mongoosePaginate = require("mongoose-paginate");


const medicalHistorySchema=mongoose.Schema({
    hipertension:Boolean,
    renalDisease:Boolean,
    comments:String,
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
medicalHistorySchema.plugin(mongoosePaginate)
module.exports=mongoose.model("MedicalHistory",medicalHistorySchema)