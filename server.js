const express = require("express");
const cors = require("cors");
const app = express();

const router = require("./routes/routes.js");

var corsOption = {
    origin : "*" // * allow all | https://google.com allow only
}

app.use(cors())

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        massage: "all good"
    })
})

app.use(router);

app.listen(4000, () => {
    console.log('Server running at http://localhost:4000')
})