const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors()) // Use this after the variable declaration

/*******************************DB************************************/

mongoose.connect('mongodb://127.0.0.1:27017/BlogDB')
.then(function(){
    console.log("Successfully Connected To DataBase");
}).catch(function(err) {
    console.log(err);
})

const blogschema = mongoose.Schema({
    name : {
     type : String,
     required : true
    },
    content : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    tags : [{
        type: String,
        required : true
    }]
});

const blogposts = mongoose.model("blogposts",blogschema)

/*******************************************************************/

//GET All posts
app.get('/posts',function(req,res){
    blogposts.find().then(function(data) {
        res.json(data);
    }).catch(function(err) {
        res.status(404).send({ message: 'Data Not-Found' });
    })
})


//GET Home posts
  app.get('/posts/starter',function(req,res){
    blogstarters.find().then(function(data) {
        res.json(data);
    }).catch(()=>{
        res.status(404).send({ message: 'Data Not-Found' });
    })
});


//GET a specific post by id
app.get('/posts/:id',function(req,res){
    const reqid = req.params.id;
    blogposts.find({_id : reqid}).then(function(data){
        res.send(data);
    }).catch(()=>{
        res.status(404).send({ message: 'Data Not-Found' });
    })
})

//GET a post by tag
app.get('/posts/tags/:tag',function(req,res){
    const tagged = req.params.tag
    blogposts.find({tags : tagged}).then(function(data){
        res.send(data);
    }).catch(()=>{
        res.status(404).send({ message: 'Data Not-Found' });
    })
})
  
//POST a new post
app.post('/new',function(req,res){
    var currentdate = new Date();
    var day = currentdate.getDay();
    var month = currentdate.getMonth();
    var year = currentdate.getFullYear();
    var hours = currentdate.getHours();
    var minutes = (currentdate.getMinutes()<10?'0':'') + currentdate.getMinutes();
    var now = hours + ":" + minutes + ' ' +day + "/" + month + "/" + year;

    const dataname = req.body.title
    const contentname = req.body.content
    const authorname = req.body.author
    const taggs = req.body.tags
    const dateon = now

    const content = new blogposts({
        name : dataname,
        content : contentname,
        author : authorname,
        date : dateon,
        tags : taggs
    });
    content.save().then(function() {
        blogposts.find().then(function(data) {
            res.send(data)
        }).catch(function(err){
            res.status(404).send({message : err})
        })
    }).catch((err)=>{
        res.status(404).send({message : err})
    })
});


//PATCH a post when you just want to update one parameter
app.patch('/edit/posts/:id',function(req,res){
    const reqid = req.params.id;
    blogposts.find({_id : reqid}).then( async function(data){
        if(!data) return res.status(404)
        if(req.body.name) {
            await blogposts.findOneAndUpdate({_id : reqid},{$set : {name : req.body.name}}).then(function(data) {
                // console.log(data);
            }).catch(function(err){
                res.status(404).send({message : err})
            })
        }
        if(req.body.content){
            await blogposts.findOneAndUpdate({_id : reqid},{$set : {content : req.body.content}}).then(function(data) {
                // console.log(data);
            }).catch(function(err){
                res.status(404).send({message : err})
            })
        }
        if(req.body.author){
            await blogposts.findOneAndUpdate({_id : reqid},{$set : {author : req.body.author}}).then(function(data) {
                // console.log(data);
            }).catch(function(err){
                res.status(404).send({message : err})
            })
        }
        if(req.body.tags){
            await blogposts.findOneAndUpdate({_id : reqid},{$set : {tags : req.body.tags}}).then(function(data) {
                // console.log(data);
            }).catch(function(err){
                res.status(404).send({message : err})
            })
        }

        res.send(data);
    })
})

  
//DELETE a specific post by providing the post id.
app.delete('/posts/:id',function(req,res){
    const reqid = req.params.id;
    blogposts.deleteOne({_id : reqid}).then(()=>{
        res.status(200).send({ message: 'Succesfully Deleted' });
    }).catch(()=>{
        res.status(404).send({ message: 'Data Not-Found' });
    })
})
  

app.listen(1500,function(){
    console.log("Api Server started at 1500");
});