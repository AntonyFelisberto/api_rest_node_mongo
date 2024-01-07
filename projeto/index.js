const express = require('express');
const mongoose = require('mongoose');
const app = express();

const Person = require('./models/Person');

app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())

app.get('/',(req,res)=>{
    res.json({
        message:"oi express"
    })
})

const DB_USER = "antony"
const DB_PASSWORD = encodeURIComponent("5GJ3GsUtw2EJPpEn")

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.pfnxque.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{
    console.log("mongo db atlas connected");
    app.listen(3000)
})
.catch((err)=>console.log(err))