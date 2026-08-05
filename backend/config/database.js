const mongoose = require("mongoose")
require('dotenv').config()


const dbConnect =()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{ console.log("mongodb connect successfully")})
    .catch((err)=>{ console.log("mongodb coneect failed!!!")})
}

module.exports = dbConnect;