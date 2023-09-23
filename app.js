const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view-engine','ejs');

API_URL = "http://localhost:1500";


app.get("/", async (req, res) => {
  try {
    const header = await axios.get(`${API_URL}/posts/starter`)
    const response = await axios.get(`${API_URL}/posts`);
    res.render('home.ejs',{home : header.data[0].content,content : response.data});
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});


app.get('/about',async function(req,res){
  try {
    const data = await axios.get(`${API_URL}/posts/starter`)
    res.render('about.ejs',{about : data.data[1].content});
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});


app.get('/contact',async function(req,res){
  try {
    const data = await axios.get(`${API_URL}/posts/starter`)
    res.render('contact.ejs',{contact : data.data[2].content});
  } catch (error) {
    res.status(500).json({ message: "Error fetching contact" });
  }
});


app.get('/compose',function(req,res){
    res.render('compose.ejs',{heading: "Compose Post", submit: "Compose"});
});


app.get('/posts/:link',async function(req,res){
  try {
    const response = await axios.get(`${API_URL}/posts/${req.params.link}`);
    res.render('post.ejs',{title : response.data[0].name,content : response.data[0].content,id : response.data[0]._id});
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
});

//showing edit page
app.get("/edit/posts/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    // console.log(response.data);
    res.render("compose.ejs", {
      heading: "Edit Post",
      submit: "Update Post",
      post: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
});

// Delete a post
app.get("/posts/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/posts/${req.params.id}`);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
});

// Partially update a post
app.post("/edit/posts/:id", async (req, res) => {
  try {
    const response = await axios.patch(
      `${API_URL}/edit/posts/${req.params.id}`,
      req.body
    );
    console.log(req.body);
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
});


app.post('/compose',async function(req,res){
    try {
      const response = await axios.post(`${API_URL}/new`,req.body);
      console.log('Done saving the post');
      res.redirect("/");
    } catch (error) {
      res.status(500).json({ message: "Error creating post" });
    }
});


app.listen(5000,function(){
    console.log("Server started at 5000");
});