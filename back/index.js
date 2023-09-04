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
    // console.log(req.body)
    const newUser = new User(req.body.newUser);
    // console.log(newUser)
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

app.post("/addFollower",(req,res) =>{
  const follower = req.body.follower;
  const followed = req.body.followed;
 UserModel.updateOne(
    {_id:follower},
    {$addToSet:
    {"followed":followed}}).then();

 UserModel.updateOne(
    {_id:followed},
    {$addToSet:
    {"followers":follower}})
    
    .then();
   
        // bulunan kişinin takipçilerine follower'ı ekle
        // UserModel.updateOne(newFollowed);
    // })
        // bulunan kişinin takipettiklerine followed'ı ekle
    //     
    // })
})

app.post("/updateUser",(req,res) =>{
    
    
})



app.post("/login",(req,response)=> {
    UserModel.find({ email: req.body.email }).exec().then(result => {
        // console.log('result:', result)

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
//     // console.log(id);
    
// })
app.post("/get-user-2",(req,res)=>{
    // console.log(req.body._id)
        UserModel.find({ _id: req.body._id, }).exec().then(result => {
            // console.log(result)
        })
})

app.get("/getAll", async (req,res) => {
      const result = await PostModel.find({});
      res.send({ posts: result })
      
    })
app.get("/getUserById/:id" , async (req,res) => {
    const result = await UserModel.findOne({ _id : req.params.id}).exec();
    res.send({ user: result })
    
})

const userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    followed:Array,
    followers:Array,
    skills:Array,
    email :{
        type:String,
        unique:true,
    },
    password : String,
    profilePhoto: String,
    backgroundPhoto:String,
    
});

const UserModel = mongoose.model('User',userSchema);

class User {
    firstName;
    lastName;
    email;
    password;
    profilePhoto;
    followers;
    followed;
    backgroundPhoto;
    skills;

    constructor(user) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.profilePhoto = user.profilePhoto;    
        this.followers = user.followers;
        this.followed = user.followed;
        this.backgroundPhoto = user.backgroundPhoto;
        this.skills = user.skills;
    }
}


class Post {
    constructor(createdBy,text,media,createdDate,likedBy){
        this.createdBy = createdBy,
        this.text = text,
        this.media = media,
        this.createdDate = createdDate;
        this.likedBy = likedBy;
    }
    
}


const postSchema = new mongoose.Schema({
    createdBy: String,
    text: String,
    media: String,
    createdDate:Number,
    likedBy : String,
});
const PostModel = mongoose.model('Post',postSchema);





app.post('/addPost',(req,res) => {
     // console.log(req.body)
     const newPost = new Post(req.body.newPost.createdBy,req.body.newPost.text,req.body.newPost.media, new Date().getTime(),req.body.newPost.likedBy);
     // console.log(newPost)
     PostModel.create(newPost).then((data)=>{
       res.status(201).send("successfully shared");
    })
    
})






app.listen(port, () => {
    // console.log(`Example app listening on port ${port}`)
})