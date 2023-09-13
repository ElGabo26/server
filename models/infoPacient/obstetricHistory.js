const mongoose= require("mongoose");
const mongoosePaginate = require("mongoose-paginate");


const ObstetricSchema=mongoose.Schema({
   gestationalHipertension: Boolean,
   gestationalProteinuria:Boolean,
   previusDiabetes: Boolean, //diabetes antes del embarazo
   pregnatDiabetes: Boolean,//diabetes durante el embarazo
   pacient:String,
   creationDate: Date,
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

ObstetricSchema.plugin(mongoosePaginate)
module.exports=mongoose.model("ObstetricHistory",ObstetricSchema)