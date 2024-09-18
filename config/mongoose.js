const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const db = () => {
    mongoose.connect("mongodb+srv://csv:EUidF74kqnEaJm07@cluster0.yd27x.mongodb.net/csvApi", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((con) => {
        console.log(`MongoDB database with host :: ${con.connection.host}`)
    })
};

module.exports = db;

