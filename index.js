require('dotenv').config();

const express = require('express');
const passport = require('passport');
const {User} = require('./models/users');
const cors = require('cors');


const db = require('./database')
const playlists = require('./routes/playlists')

const users = require('./routes/users')
const auth =require('./routes/auth')



const app = express()
const port = process.env.PORT || 3000; // Use PORT environment variable or default to 3000

app.listen(port, () => console.log(`Song Project is running on Port - ${port}!`));


// Passport Config
passport.use(User.createStrategy());
app.use(passport.initialize());
app.use(cors());

app.use(express.json());
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

  app.use('/playlists',  cors(corsOptions), playlists);

app.use('/', playlists)
app.use('/songs', playlists);
 app.use('/users', users);
 app.use('/auth',auth)






// app.listen(port, () => console.log(`Song Project is running on Port - ${port}!`))