require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true})
const db = mongoose.connection
db.on('error',(error)=>console.log(error))
db.once('open',()=>console.log('Database Connected!'))
app.use(express.json())


const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers',subscribersRouter)


app.listen(300,()=>console.log('Server Started Again!'))