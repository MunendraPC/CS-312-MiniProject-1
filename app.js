const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.send("Blog App is working!");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});