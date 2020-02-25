const express = require('express');
// const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
require('dotenv').config();

// import routes
const userAuthRoutes = require('./routes/userAuth');

// initialize app
const app = express();
const PORT = process.env.PORT || 3000;



// If deployed, use the deployed database. Otherwise use the local treasure_app database
const DATABASE = process.env.DATABASE;

mongoose.connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(express.urlencoded({ extended: true }));

// Routes middleware
app.use('/api', userAuthRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
