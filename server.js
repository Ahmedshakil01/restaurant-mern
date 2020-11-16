const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/auth',authRoutes);

const connectDB = require('./database/db');

connectDB();
app.get('/',(req,res)=>{
    res.send('Inside server');
});




const port = process.env.PORT || 5000;

app.listen(port, ()=>console.log(`Listing on port ${port}`));