const mongoose = require('mongoose');

const connectDB = async (DB_URL)=>{
    await mongoose.connect(DB_URL, function(err, db) {
        if (err) throw err;
            console.log("Database created!");
           
    });
}

module.exports = connectDB;
// connect(
//     DB_URL,
//     async(err)=>{
//         if(err) throw err;
//         console.log("conncted to db")
//     }
// )