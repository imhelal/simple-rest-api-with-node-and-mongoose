const mongoose = require('mongoose')

const userSchama = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true,
        default: Date.now
    }
})


module.exports = mongoose.model('User',userSchama)