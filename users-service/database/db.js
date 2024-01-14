const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

// Connection to MongoDB
const connectToMongo = () => {
    mongoose.connect('mongodb+srv://admin-user:password-user@cluster0.fwlinqy.mongodb.net/users?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to MongoDB successfully \n');
    })
    .catch(error => {
        console.error('Failed to connect to MongoDB:', error);
    });
}
module.exports = connectToMongo
