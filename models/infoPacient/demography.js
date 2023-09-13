const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate");
const demographycSchema= mongoose.Schema({
    maternalAge: Number, //edad en años de la madre a la fecha esperada del parto
    fetusesNumber: Number, // numero de fetos
    ageAtDelibery:Number, // edad en semanas al momento del parto
    ageAtEligibility: Number,// edad en semanas al  momento de ingresar al estudio
    initialWeigth:Number,//peso en kg al inicio del estudio
    indexBodymass:Number,//indice de masa corporal
    gravidity: Number, //numero de envarasos que ha tenido
    parity: Number, //numero de  veces que ha dado a luz
    smoking: Boolean,// fumador  durante el embarazo
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

})
demographycSchema.plugin(mongoosePaginate)


module.exports=mongoose.model('PatientDemography',demographycSchema)