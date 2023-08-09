//import express from 'express';
//import bodyParser from 'body-parser';
//import mongoose, { Schema } from'mongoose';
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 3000

mongoose.connect('mongodb://127.0.0.1:27017/userDB',{useNewUrlParser:true});
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('Rest Api');
});

app.post('/addUser',(req,res) => {
    
    var newUser = new User();
    newUser.email =  "brk.kc.06@icloud.com";
    newUser.firstName = "Burak";
    newUser.lastName = "Koç";
    newUser.password ="12345";
    newUser.dateCreated = new Date();
    newUser.dateUpdated = newUser.dateCreated;

    newUser.save().then((data)=>{
        res.send(data)
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

var Schema = mongoose.Schema;

var userSchema = new Schema({

    firstName : String,
    lastName : String,
    email :({
        unique:true
    }),

    password : String,
    dateCreated : Date,
    dateUpdated: Date,
    phoneNumbers : [{
        phoneType : String,
        phoneNumber : String,
    }]
});

var User = mongoose.model('User',userSchema);

//export default User;

