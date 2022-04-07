require('dotenv').config()

const express = require("express");
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

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

app.post('/login', authenticateToken, (req, res)=>{
    // Authenticate user

    const username =  req.body.username;
    const user = { name: username }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken})
});

function authenticateToken(req, res, next){

}

console.log("Hello, world!");

app.listen(3000);