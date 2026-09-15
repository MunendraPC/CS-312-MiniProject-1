const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;
let posts = [];

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    const selectedCategory = req.query.category || "All";

    res.render("index", {
        posts: posts,
        selectedCategory: selectedCategory
    });
});

app.post("/posts", (req, res) => {
    const newPost = {
        creator: req.body.creator,
        title: req.body.title,
        category: req.body.category,
        content: req.body.content,
        createdAt: new Date().toLocaleString()
    };

    posts.push(newPost);

    console.log(posts);

    res.redirect("/");
});

app.get("/edit/:index", (req, res) => {
    const index = req.params.index;
    const post = posts[index];

    res.render("edit", {
        post: post,
        index: index
    });
});

app.post("/edit/:index", (req, res) => {
    const index = req.params.index;

    posts[index].creator = req.body.creator;
    posts[index].title = req.body.title;
    posts[index].category = req.body.category;
    posts[index].content = req.body.content;

    res.redirect("/");
});

app.post("/delete/:index", (req, res) => {
    const index = req.params.index;

    posts.splice(index, 1);

    res.redirect("/");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

