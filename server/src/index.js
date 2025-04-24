const express = require('express');
const app = express();
const mongoose = require('mongoose');

const {configExpress} = require('./config/express');
const { configRoutes } = require('./config/routes');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3030;


    configExpress(app);
    configRoutes(app);
    
    mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('Connected to MongoDB');
     
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.log('Cannot connect to DB', err));
