const express =   require("express")
const bodyParser=require("body-parser")
const cors=require("cors")
const { API_VERSION}= require("./utils/constants.js")

const app= express()

//Import routings
const authRoutes = require("./router/auth.js")
const userRoutes = require("./router/user.js")
const pacientRoutes = require("./router/pacient.js")
const cardioRoutes=require("./router/infoPacient/cardioSigns.js")
const demographyRoutes=require("./router/infoPacient/demography.js")
const fetalImagesRoutes=require("./router/infoPacient/fetalImages.js")
const fetalTestRoutes=require("./router/infoPacient/fetalTest.js")
const hematologicRoutes=require("./router/infoPacient/hematologic.js")
const hepaticTestRoutes=require("./router/infoPacient/hepaticTest.js")
const medicalHistoryRoutes=require("./router/infoPacient/medicalHistory.js")
const obstetricHistoryRoutes=require("./router/infoPacient/obstetricHistory.js")
const renalSingnsRoutes=require("./router/infoPacient/renalSingns.js")
const symptomsRoutes=require("./router/infoPacient/symptoms.js")

//Configure body Parse
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Configure header HTTP-CORS
app.use(cors());
// Configure rountings
app.use(`/api/${API_VERSION}`,authRoutes)
app.use(`/api/${API_VERSION}`,userRoutes)
app.use(`/api/${API_VERSION}`,pacientRoutes)
app.use(`/api/${API_VERSION}`,cardioRoutes)
app.use(`/api/${API_VERSION}`,demographyRoutes)
app.use(`/api/${API_VERSION}`,fetalImagesRoutes)
app.use(`/api/${API_VERSION}`,fetalTestRoutes)
app.use(`/api/${API_VERSION}`,hematologicRoutes)
app.use(`/api/${API_VERSION}`,hepaticTestRoutes)
app.use(`/api/${API_VERSION}`,medicalHistoryRoutes)
app.use(`/api/${API_VERSION}`,obstetricHistoryRoutes)
app.use(`/api/${API_VERSION}`,renalSingnsRoutes)
app.use(`/api/${API_VERSION}`,symptomsRoutes)
// Configure statics
app.use(express.static("uploads"));


module.exports= app