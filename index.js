const dotenv = require("dotenv");
const express = require("express");
const app = express();
//const { getAllPosts, addNewPost } = require("./database/static-db.js");
const connectDB = require("./database/db");
const connectContactDB = require("./database/db_contact");
const Post = require("./database/Post.js");
const Contact = require('./database/Contact');

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server slusa na portu: ${PORT}`);
});

connectDB();
connectContactDB();


app.use(express.static("client"));
app.use(express.json());

//-------------axios requests for db to post on main  page-------
app.get("/api/posts", async (req, res) => {

    try {
        const allPosts = await Post.find().sort({ _id: -1 });

        res.json({
            success: true,
            posts: allPosts,
        });

    } catch (err) {
        res.json({
            success: false,
            msg: err.message,

        });
    }
});

app.post("/api/posts", async (req, res) => {
    try {
        const author = req.body.author;
        const text = req.body.text;

        const newPost = new Post({
            author,
            text,
        });

        const savedPost = await newPost.save();

        res.json({
            success: true,
            post: savedPost,
        });


    } catch (err) {
        res.json({
            success: false,
            msg: err.message,
        });
    }
});
//----------------------------------------------------------------------------

app.get("/api/posts/:postId", async (req, res) => { //dve tacke znaci da ce ta vrednost postId biti neka vrednost koja se menja odnosno promenljiva
    try {

        const postId = req.params.postId;
        const post = await Post.findById(postId);

        res.json({
            success: true,
            post: post,
        });

    } catch (err) {
        res.json({
            success: false,
            msg: err.message,
        });

    }

});
//---------------------------------------HTTP request za postavjanje komentara--------------------------
app.post("/api/comment", async (req, res) => {
    try {
        const postId = req.body.postId;
        const author = req.body.author;
        const text = req.body.text;

        console.log(postId, author, text);

        const post = await Post.findById(postId); //fija koja iz baze izvlaci id


        const newComment = { //sta ce svaki podkomentar da sadrzi odnosno njegova sema
            author: author,
            text: text,
            createdAt: new Date(),
        };
        post.comments.push(newComment); //ubacivanje podkomentara u komentar
        post.commentsNumber++; //svaki put kada dodamo podkomentar apdejtuje se commentsNumber tj poveca za 1
        const savedPost = await post.save(); //cuvamo izmene u bazi
        res.json({
            success: true,
            post: savedPost,
        });
    } catch (err) {
        res.json({
            success: false,
            msg: err.message,
        });
    }
});
//----------------------------------------Contact strana------------------------------------------------
app.get('/api/contacts', async (req, res) => {
    try {
        const allContacts = await Contact.find().sort({ _id: -1 });
        res.json({
            success: true,
            contacts: allContacts,
            msg: "Uspesan get request",
        });
    } catch (err) {
        res.json({
            success: false,
            msg: err.message,
        })
    }
});
app.post('/api/contacts', async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const message = req.body.message;

        const newContact = new Contact({
            name,
            email,
            phone,
            message,
        });

        const savedContact = await newContact.save();
        res.json({
            success: true,
            contacts: savedContact,
            msg: 'This is a contact res.json!',
        });
    } catch (err) {
        res.json({
            success: false,
            msg: err.message,
        });
    }
});

//-----------------------------------------------------------------------------------------------------







/* Static db requests
app.get("/api/posts", (req, res) => {

    const allPosts = getAllPosts();
    res.json({
        success: true,
        posts: allPosts
    });


});

app.post("/api/posts", (req, res) => {
    const author = req.body.author;
    const text = req.body.text;

    const newPost = {
        _id: Math.floor(Math.random() * 1000),
        author: author,
        text: text,
        createdAt: new Date(),
        commentsNumber: 0,
        comments: [],
    };
    addNewPost(newPost);

    res.json({
        success: true,
        post: newPost,
    });

});
*/