const express = require('express');
const app = express();
require('dotenv').config()
const mongoose = require('mongoose');
const Person = require('./models/Person');
const personRoutes = require('./routes/personRoutes');


app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())

app.use('/person',personRoutes)

app.get('/',(req,res)=>{
    res.json({
        message:"oi express"
    })
})

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.pfnxque.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{
    console.log("mongo db atlas connected");
    app.listen(3000)
})
.catch((err)=>console.log(err))