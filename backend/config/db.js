const mongoose = require("mongoose")
const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    }catch(err){
        console.log(`${err}`.red.underline)
        process.exit()
    }
}

module.exports = connectDB