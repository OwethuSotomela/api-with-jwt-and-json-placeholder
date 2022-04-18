const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: "Welcome to the API"
    })
})

app.get('/api/post', verifyToken, (req, res) => {
    res.json({
        post: "Post created"
    })
})

app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        username: 'Owe',
        email: 'owe@gmail.com'
    }

    jwt.sign({ user }, 'secretkey', (err, token) => {
        res.json({
            token
        })
    })

})

// Format of token
// Authoization: <access token>

// verify token
function verifyToken(req, res, next) {
    // get auth header value 
    const bearerHeader = req.headers['authorization'];
    // check if not undefined
    if (typeof bearerHeader !== 'undefined') {
        // splint at the space
        const bearer = bearerHeader.split(' ');
        // get token from array
    } else {
        // forbidden
        res.sendStatus(403)
    }
}

console.log("Hello, Oz!");

app.listen(3000);