import app from "./app";
import env from "./util/validateEnv";    
import mongoose from "mongoose";                                        

const port = env.PORT; //get the port from the env file                                             

mongoose.connect(env.MONGO_CONNNECTION_STRING) //connect to the database                      
    .then(() => {                                                       
        console.log("Mongoose connected"); //log if the connection was successful                        
        app.listen(port, () => {                                        
            console.log("Server running on port: " + port);             
        }); //start the server on the port from the env file
    })
    .catch(console.error); //catch errors from the database connection and log them

