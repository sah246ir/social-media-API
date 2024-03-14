require('dotenv').config( );
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const authRoute = require('./routes/authRoute');
const followRoute = require('./routes/followRoute');
const postRoute = require('./routes/postRoute');
const userRoute = require('./routes/userRoute');
const messageRoute = require('./routes/messageRoute');

const rateLimit = require("express-rate-limit");
const input_sanitizer = require("express-mongo-sanitize")
const helmet = require("helmet");
const { getHomePageData } = require('./controllers/homeController');
const { verifyToken } = require('./middleware');

console.log(process.env.MONGO_URI)
  mongoose.connect(process.env.MONGO_URI, {

})
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', process.env.MONGO_URI);
    });




const limiter = rateLimit({
    max: 200,
    windowMs: 60 * 60 * 1000,
    message: "Too many request from this IP"
});

const app = express()


app.use(limiter);
app.use(helmet());
app.use(input_sanitizer());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }))



// controllers
app.use("/auth", authRoute)
app.use("/profile", userRoute)
app.use("/posts", postRoute)
app.use("/action", followRoute)
app.use("/messages",messageRoute)

app.get("", verifyToken,getHomePageData)
// server listen
const server = app.listen(process.env.PORT || 8000, () => {
    console.log("app running on localhost:",process.env.PORT)
})

module.exports = server






