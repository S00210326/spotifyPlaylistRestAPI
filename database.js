const mongoose = require('mongoose')
require('dotenv').config();
const connectionString = process.env.CONNECTIONSTRING;

mongoose
.connect(connectionString,
{"useNewURLParser":true,
"useUnifiedTopology": true})
.catch (error => {
    console.log(`Database connection refused ${error}`);
    process.exit(2);
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log("DB connected")
});