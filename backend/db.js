const mongoose = require('mongoose')
// mongodb://localhost:27017 replaced by that below
const mongoUri = 'mongodb://127.0.0.1:27017/inotebook' 

// No 1: function of connecting to database and exported that func
const connectToMongoose = ()=>{
mongoose.connect(mongoUri).then(()=>{
    console.log("Conneceted To Database")
}).catch((e)=>{
    console.log(e.message)
})
}

module.exports = connectToMongoose