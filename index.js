const mongoose = require("mongoose")
const {DB_USER,
    DB_PASSWORD,
    DB_HOST,
    API_VERSION,
    IP_SERVER} =require("./utils/constants")

const app= require('./app')
const uri="mongodb+srv://admin:admin123456@proyector.bv933xo.mongodb.net/?retryWrites=true&w=majority"

const PORT= process.env.POST||3979
    
    const connectDB = async () => {
      
        try {
          
          await mongoose.connect(uri)
          
          console.log('La conexión con la base de datos ha sido exitosa.');
          app.listen(PORT,()=>{
              console.log("##############################")
              console.log("######h######API REST###########")
              console.log(`http//${IP_SERVER}:${PORT}/api/${API_VERSION}`)
          })

        } catch (err) {
          console.log('Error al conectar a la base de datos', err);
        }

      }
      
      connectDB()