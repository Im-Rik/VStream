const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const cookieParser = require('cookie-parser');

const homeRoute = require('./routes/home');
const userRoute = require('./routes/users');
const videoRoute = require('./routes/videos');
const { watchFiles } = require('./services/fileWatcherService');
const checkForAuthenticationCookie = require('./middlewares/authentication');


const app = express();
const PORT = 4500;

//connections
mongoose.connect('mongodb://127.0.0.1:27017/vstream')
.then(()=>{console.log("MongoDB connected")})
.catch((e)=>{console.log(e)});


const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

//Middlewares
app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

// Start watching files
watchFiles();

//Routes
app.use('/', homeRoute); 
app.use('/user', userRoute);  
app.use('/api', videoRoute);


app.listen(PORT, ()=> console.log(`Listening from http://127.0.0.1:${PORT}`));