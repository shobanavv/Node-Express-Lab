const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let idCounter = 4;
let posts = [
    {   id:1,
        title: 'b',
        contents: 'd'

    },
    {
        id:2,
        title: 'a',
        contents: 'a'

    },
    {   id:3,
        title: 'b',
        contents: 'd'

    },
    {   id:4,
        title: 'c',
        contents: 'c'

    }

];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());


server.get('/posts', (req, res) => {
    let searchTerm = req.query.term;
    if(searchTerm === undefined) {
        res.status(200);
        res.send({userPosts:posts});
    } else {
        let newArr =[];
        posts.forEach(obj => {
            if(obj.title.includes(searchTerm) || obj.contents.includes(searchTerm)) {
            newArr.push(obj);
            }
        }); //for each
            if(newArr.length === 0 ) {
                res.send ({userPosts: posts });
            } else {
                res.send({ userPosts: newArr});
            }
    } // else
    
});

server.post('/posts', (req,res) => {
    const newPost = req.body;
    if(!newPost.title) {
        res.status(405)
        res.send({ error: "Missing title " });
        return;
    }
    if(!newPost.contents) {
        res.status(405)
        res.send({ error: "Missing Contents " });
        return;
    }
    newPost.id = ++idCounter;
    posts.push(newPost);
    res.json(newPost);   //res.send({newPost});
     
});


//put
server.put('/posts', (req,res) => {
    const newPost = req.body;
    if(!newPost.title) {
        res.status(405)
        res.send({ error: "Missing title " });
        return;
    }
    if(!newPost.contents) {
        res.status(405)
        res.send({ error: "Missing Contents " });
        return;
    }
    let idEqual = false;
    posts = posts.map(obj => {
    if(obj.id === parseInt(newPost.id)) {
        idEqual = true;
        return req.body;
     }
     return obj;
    });
    if(idEqual) {
        console.log("idEqual true")
        res.json(req.body);   //res.send({newPost});
    } else {
        res.send({error: 'Id not match'});
    }
});

server.delete("/posts",(req, res) => {
    const newPost = res.body;
    
})





module.exports = { posts, server };
