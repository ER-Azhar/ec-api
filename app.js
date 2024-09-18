// importing all required dependency
const express = require("express");
const app = express();
const port = 3000;
const db = require("./config/mongoose");


app.use(express.json());

// use routes
app.use("/", require("./routes"));
app.use('/products', require('./routes/api/v1/products'));


db();


// listening to port
app.listen(port, function (err) {
    if (err) {
        console.log("Error running server");
    }
    console.log(`server is up and running on port :: ${port}`);
})