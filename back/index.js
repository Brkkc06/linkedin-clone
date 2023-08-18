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

app.post('/addUser',(req,res) => {
    console.log(req.body)
    const newUser = new User(req.body.newUser);
    console.log(newUser)
    UserModel.create(newUser).then((data)=>{
        res.status(201).send("successfully saved");
    }).catch(err => {
        if (err.keyPattern.email === 1) {
            res.status(400).send("already registered email: "  + err.keyValue.email);
        } else {
            res.status(500).send("error happened");
        }
    })
})

app.post("/login",(req,response)=> {
    UserModel.find({ email: req.body.email }).exec().then(result => {
        console.log('result:', result)

        if(result.length !=0){
            if( req.body.password != result[0].password ){
                response.send({ message: "Yanlış şifre" })
            }
            else{
                response.send({ message: "Başarılı Şekilde Giriş yapıldı", id: result[0]._id })
            } 
        }
        else{
            response.send({ message: "Kayıtlı olmayan e-posta-şifre" })
        }
    })
    
})


// app.get("/get-user-1/:id",(req,res) =>{
//     const id = req.params.id;
//     console.log(id);
    
// })
app.post("/get-user-2",(req,res)=>{
    console.log(req.body._id)
        UserModel.find({ _id: req.body._id, }).exec().then(result => {
            console.log(result)
        })
})

app.get("/getAll", async (req,res) => {
      const result = await PostModel.find({});
      res.send({ posts: result })
      
    })



const userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email :{
        type:String,
        unique:true,
    },
    password : String,
});

const UserModel = mongoose.model('User',userSchema);

class User {
    firstName;
    lastName;
    email;
    password;

    constructor(user) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
    }
}


class Post {
    constructor(createdBy,text){
        this.createdBy = createdBy,
        this.text = text
    }
    
}


const postSchema = new mongoose.Schema({
    createdBy:String,
    text:String,
});
const PostModel = mongoose.model('Post',postSchema);





app.post('/addPost',(req,res) => {
     console.log(req.body)
     const newPost = new Post(req.body.newPost.createdBy,req.body.newPost.text);
     console.log(newPost)
     PostModel.create(newPost).then((data)=>{
       res.status(201).send("successfully shared");
    })
    
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})