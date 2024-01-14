const mongoose = require('mongoose');
require('dotenv').config();

// Connection to MongoDB
const connectToMongo = () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Connected to MongoDB successfully \n');
    })
    .catch(error => {
      console.error('Failed to connect to MongoDB:', error);
    });
}

module.exports = connectToMongo;
