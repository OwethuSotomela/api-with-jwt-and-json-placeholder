const express = require("express");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
    res.json({
        message: "Welcome to the API",
    });
});

app.get("/api/post", verifyToken, (req, res) => {
    jwt.verify(req.key, "secretkey", (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                post: "Post created...",
                authData,
            });
        }
    });
});

app.post("/api/login", async (req, res) => {
    
    var { username } = req.body;
    var userExists = false;

    await axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then(function (result) {
            let data = result.data;
            for (let i = 0; i < data.length; i++) {
                if (data[i].username.toLowerCase() == username.toLowerCase()) {
                    userExists = true;
                    break;
                }
            }
        });

    if (userExists) {
        jwt.sign({ username }, "secretkey", {expiresIn: '5m'}, (err, key) => {
            res.json({
                key,
            });
        });
    } else {
        res.sendStatus(403);
    }
});

// Format of token
// Authoization: <access token>

// verify token
function verifyToken(req, res, next) {
    // get auth header value
    const bearerHeader = req.headers["authorization"];
    // check if not undefined
    if (typeof bearerHeader !== "undefined") {
        // splint at the space
        const bearer = bearerHeader.split(" ");
        // get token from array
        const bearerToken = bearer[1];
        // set the token
        req.key = bearerToken;
        // next middleware
        next();
    } else {
        // forbidden
        res.sendStatus(403);
    }
}

console.log("Hello, Oz!");

app.listen(3000);
