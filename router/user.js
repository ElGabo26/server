const express= require("express");
const multiparty= require("connect-multiparty")
const md_auth = require("../middlewares/authenticated");
const UserController =require("../controllers/user");

const md_upload= multiparty({uploadDir:"./uploads/doctorAvatar"})// carpeta donde se guardan las imagenes

const api=express.Router()

api.get("/user/get",[md_auth.asureAuth],UserController.getDoctor)
api.get("/users",[md_auth.asureAuth],UserController.getDoctors)
api.post("/user",UserController.createDoctor)
api.patch("/user/:id",[md_auth.asureAuth],UserController.updateDoctor)
api.delete("/user/:id",[md_auth.asureAuth],UserController.deleteDoctor)

module.exports=api