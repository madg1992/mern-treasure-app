const express = require('express');
// const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Routes middleware
app.use('/api', userRoutes);

// If deployed, use the deployed database. Otherwise use the local treasure_app database
const DATABASE = process.env.DATABASE;

mongoose.connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("mongoDB database connection established successfully");
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
