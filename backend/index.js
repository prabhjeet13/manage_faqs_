const express = require('express');
const app = express();
const responseTime = require('response-time')
require('dotenv').config();

const PORT = process.env.PORT || 4001;

const cors = require('cors');
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
)



const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.json());
app.use(responseTime());
const faqroutes = require('./routes/faq');
const authroutes = require('./routes/auth');
app.use('/api/faqs',faqroutes);
app.use('/api/auth',authroutes);



const {dbConnect} = require('./config/Database');

app.listen(PORT,() => {
    console.log('listening on port',PORT);
})

dbConnect();