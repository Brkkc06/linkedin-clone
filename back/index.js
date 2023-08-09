//import express from 'express';
//import bodyParser from 'body-parser';
//import mongoose, { Schema } from'mongoose';
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000
let db;

mongoose.connect('mongodb://127.0.0.1:27017/userDB',{useNewUrlParser:true});
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}));

app.get('/',(req,res)=>{
    res.send('Rest Api');
});

app.post('/addUser',(req,res) => {
    const newUser = new User(req.body.newUser);
    newUser.save().then((data)=>{
        res.send("successfully saved");
    })
})

app.post("/login",(req,response)=> {
    User.find({ email: req.body.email }).exec().then(result => {
        console.log('result:', result)

        if(result.length !=0){
            if( req.body.password != result[0].password ){
                response.send("Yanlış şifre")
            }
            else{
                response.send("Başarılı Şekilde Giriş yapıldı")
            } 
        }
        else{
            response.send("Kayıtlı olmayan e-posta-şifre")
        }
    })
    
})








app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName : String,
    lastName : String,
    email :String,
    password : String,
    // dateCreated : Date,
    // dateUpdated: Date,
    // phoneNumbers : String,
});

var User = mongoose.model('User',userSchema);



