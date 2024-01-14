const mongoose = require('mongoose')

// Connection to MongoDB
const connectToMongo=()=>{
    mongoose.connect('mongodb+srv://admin-user:password-user@cluster0.fwlinqy.mongodb.net/notes?retryWrites=true&w=majority')
    .then(() => {
    console.log('Connected to MongoDB successfully \n');
})
.catch(error => {
    console.error('Failed to connect to MongoDB:', error);
});
}
module.exports = connectToMongo
