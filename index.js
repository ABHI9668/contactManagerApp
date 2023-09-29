const express=require("express");
const errorHandler = require("./middleware/errorHandler");
const connectdb = require("./config/dbConnection");
const app=express();
const dotenv=require("dotenv").config();
const port=process.env.PORT || 5000


connectdb();

app.use(express.json());
app.use("/api/contacts",require("./routes/contactsRoutes"))
app.use("/api/users",require("./routes/userRoutes"))
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`Server Starting at ${port}` );

})

