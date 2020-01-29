
console.log("server is on!")
require("dotenv").config()
var express = require("express");
var app = express();

const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/users", { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', (error)=> console.error(error))
db.once('open',()=> console.log('connected to database!'))


//middleware
app.use(express.json())


const userRouter = require('./routes/users')
app.use('/users', userRouter)



var server = app.listen("3000", listening);

function listening(){
    console.log("listening on port 3000...")
}
