const express = require("express");
const app = express();

const posts = [
    {
        username: 'Owe',
        title: 'Post 1'
    },
    {
        username: 'Wethu',
        title: 'Post 2'
    }
    
]

app.get('/posts', (req, res)=>{
    res.json(posts);
});

app.get('/login', (req, res)=>{
    // Authenticate user
});

console.log("Hello, world!");

app.listen(3000);