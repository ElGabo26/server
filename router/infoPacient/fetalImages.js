const express= require("express");
const multiparty= require("connect-multiparty")
const md_auth = require("../../middlewares/authenticated");
const imagesController =require("../../controllers/infoPacient/fetalImages");

const md_upload= multiparty({uploadDir:"./uploads/fetalImages"})// carpeta donde se guardan las imagenes

const api=express.Router()

api.post("/images/:id",[md_auth.asureAuth,md_upload],imagesController.addImage)
api.get("/getImages/",[md_auth.asureAuth],imagesController.getImages)

module.exports=api