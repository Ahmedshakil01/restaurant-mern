const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        await mongoose.connect('mongodb+srv://restaurant-user:shak0122@restaurant-mern.jaq8n.mongodb.net/restaurant-user?retryWrites=true&w=majority',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('database connected')
    }catch(err){
        console.log(err);
    }

};
module.exports = connectDB;