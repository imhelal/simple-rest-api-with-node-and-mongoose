const mongoose = require('mongoose')

const subscriverSchama = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  subscribedTochannel:{
    type:String,
    required:true
  },
  subscriberTime:{
    type:String,
    required:true,
    default: Date.now
  }

})


module.exports = mongoose.model('Subscriber',subscriverSchama)