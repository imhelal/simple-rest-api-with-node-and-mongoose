require('dotenv').config()
const express = require('express')
const app     = express()
const mongoose= require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology:true})
const db = mongoose.connection

db.on('error',(err)=>console.log(err))
db.once('open',()=>console.log('Database Connected!'))
app.use(express.json())
const appRouter = require('./routes/users')
app.use('/users',appRouter)


app.listen(500,()=>console.log("Server Started!"))