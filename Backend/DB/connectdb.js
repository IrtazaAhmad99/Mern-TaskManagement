const mongoose = require("mongoose")
const ENV = require("../Helper/ENV/environment")
const querySrting=ENV.MONGO_URI

const connectdb = async () => {
    try {
        const conn = await mongoose.connect(querySrting)
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}


module.exports = connectdb
