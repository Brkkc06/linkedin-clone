//import express from 'express';
//import bodyParser from 'body-parser';
//import mongoose, { Schema } from'mongoose';
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors');
const app = express();
const fs = require('fs');
const fileupload = require('express-fileupload');
const port = 3000
let db;
mongoose.connect('mongodb://127.0.0.1:27017/userDB', { useNewUrlParser: true });
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/images'))
app.use(cors({
    origin: '*'
}
),
    fileupload()
);
app.get("/getFile", (req, res) => {
    res.sendFile(req.query.src)
});
app.post('/addUser', (req, res) => {

    const newUser = new User(req.body.newUser);

    UserModel.create(newUser).then((data) => {
        res.status(201).send("Başarıyla Kaydedildi");
    }).catch(err => {
        if (err.keyPattern.email === 1) {
            res.status(400).send("HATA (Kayıtlı Email) " + err.keyValue.email);
        } else {
            res.status(500).send("Bir hata oluştu");
        }
    })
})
app.post("/saveImg", (req, res) => {
    const extension = req.body.extension
    const fileName = `${Date.now()}.${extension}`;
    const filePath = `C:\\Users\\tuozm\\OneDrive\\Masaüstü\\linkedin c\\back\\images\\${fileName}`;
    fs.writeFile(filePath, req.files.image.data, (err, result) => {
        if (err) res.status(500);
        else res.send(filePath);
    })
})
app.post("/addFollower", (req, res) => {
    console.log(req.body)
    const follower = req.body.follower;
    const followed = req.body.followed;
    UserModel.updateOne(
        { _id: follower },
        {
            $addToSet:
                { "followed": followed }
        }).then().catch(er => console.log(er));
    UserModel.updateOne(
        { _id: followed },
        {
            $addToSet:
                { "followers": follower }
        })
        .then().catch(er => console.log(er));
})
app.post("/updateLike", (req, response) => {
    console.log(req.body)
    const postId = req.body.postId;
    const likedBy = req.body.likedBy;
    return PostModel.updateOne(
        { _id: postId },
        {
            $addToSet:
                { "likedBy": likedBy }
        }).then((result) => {
            response.send(result);
        }).catch((err) => {
            console.log(err);
        })
})
app.post("/disLike", (req, response) => {
    const postId = req.body.postId;
    const likedBy = req.body.likedBy;
    return PostModel.updateOne(
        { _id: postId },
        {
            $pullAll:
                { likedBy: [likedBy] }
        }).then((result) => {
            response.send(result);
        }).catch((err) => {
            console.log(err);
        })
})
app.post("/updateUser", (req, res) => {
    const loginUserId = req.body.loginUserId;
    const user = req.body.user;
    UserModel.updateOne(
        { _id: loginUserId },
        user
    )
        .then((result) => {
            res.send({ message: "başarıyla kaydedildi." })
        }).catch((err) => {
            console.error(err)
        })
})
app.post("/login", (req, response) => {
    UserModel.find({ email: req.body.email }).exec().then(result => {
        if (result.length != 0) {
            if (req.body.password != result[0].password) {
                response.send({ message: "Yanlış şifre" })
            }
            else {
                response.send({ message: "Başarılı Şekilde Giriş yapıldı", id: result[0]._id })
            }
        }
        else {
            response.send({ message: "Kayıtlı olmayan e-posta-şifre" })
        }
    })
})
app.get("/getAllUser",async (req,res) =>{
    const result = await UserModel.find({});
    res.send({users:result})
})
app.get("/getAll", async (req, res) => {
    const result = await PostModel.find({});
    res.send({ posts: result })
})
app.get("/getUserById/:id", async (req, res) => {
    const result = await UserModel.findOne({ _id: req.params.id }).exec();
    res.send({ user: result })
})
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    followed: Array,
    followers: Array,
    skills: Array,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    profilePhoto: String,
    backgroundPhoto: String,
    companyOrSchool: String,
    department: String,

});
const UserModel = mongoose.model('User', userSchema);
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
    companyOrSchool;
    department
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
        this.companyOrSchool = user.companyOrSchool;
        this.department = user.department;
    }
}
class Post {
    constructor(createdBy, text, mediaPhoto, mediaVideo, createdDate, likedBy, activity, activityClock) {
        this.createdBy = createdBy,
            this.text = text,
            this.mediaPhoto = mediaPhoto,
            this.mediaVideo = mediaVideo
        this.createdDate = createdDate;
        this.likedBy = likedBy;
        this.activity = activity;
        this.activityClock = activityClock
    }
}
const postSchema = new mongoose.Schema({
    createdBy: String,
    text: String,
    mediaPhoto: String,
    mediaVideo: String,
    createdDate: Number,
    likedBy: Array,
    activity: Number,
    activityClock: String,
});
const PostModel = mongoose.model('Post', postSchema);
app.post('/addPost', (req, res) => {
    const newPost = new Post(req.body.newPost.createdBy, req.body.newPost.text, req.body.newPost.mediaPhoto, req.body.newPost.mediaVideo, new Date().getTime(), req.body.newPost.likedBy, req.body.newPost.activity, req.body.newPost.activityClock);

    PostModel.create(newPost).then((data) => {
        res.status(201).send("successfully shared");
    })
})
app.listen(port, () => { })