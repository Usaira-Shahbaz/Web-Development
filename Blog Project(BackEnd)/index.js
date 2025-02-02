const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
let { v4 : uuidv4 } = require('uuid');
let methodOverride = require('method-override')

 


app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))


app.use(express.static(path.join(__dirname,"public")))


posts = [
    {
        id : uuidv4(),
        username:"Usaira Shahbaz",
        content:"Coding Programming and Logic Building"
    },
    {
        id : uuidv4(),
        username:"arbiSoft",
        content:"Hiring Software Engineers"
    },
    {
        id : uuidv4(),
        username:"Namal",
        content:"Namal is best university"
    }
]

app.get('/posts',(req,resp)=>{
    resp.render("main.ejs",{ posts })
})

app.get('/posts/new',(req,resp)=>{
    resp.render("newPost.ejs")
})

app.post('/posts',(req,resp)=>{
    let { username,content} = req.body;
    let id = uuidv4();
    posts.push({ id,username,content })
    resp.redirect("http://localhost:3000/posts")
})

app.get('/posts/:id',(req,resp)=>{
    let { id } = req.params;
    console.log("Working....")
    let post = posts.find((p)=> p.id === id)
    
    resp.render("show.ejs", { post })
})

app.patch('/posts/:id', (req, resp) => {
    let { id } = req.params;
    console.log("Patch request working...");
    console.log("Request Body: ", req.body);  // Log the full body
    let newContent = req.body.content;
    console.log("New Content: ", newContent);  // Check if content is coming through
    let post = posts.find((p) => p.id === id);
    
    if (post) {
        post.content = newContent;
        console.log("Updated Post: ", post);
    }
    
    resp.redirect("http://localhost:3000/posts")
});


app.get("/posts/:id/edit",(req,resp)=>{
    let { id } = req.params;
    let post = posts.find((p)=> p.id === id)
    resp.render("update.ejs",{ post })
})

app.delete("/posts/:id",(req,resp)=>{
    let { id } = req.params;
    posts = posts.filter((p)=> p.id != id)
    resp.redirect("http://localhost:3000/posts")
})

app.listen(port,()=>{
    console.log(`Successfully running on port ${port}`)
})