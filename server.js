const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRouter = require('./router/userRouter');
const flightRouter = require('./router/flightRouter');
const hotelRouter = require('./router/hotelRouter');
const overlandRouter = require('./router/overlandRouter');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(cors());

app.use('/users', userRouter);
app.use('/flights', flightRouter);
app.use('/hotels', hotelRouter);
app.use('/overlands', overlandRouter);

app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req,res) =>{
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req,res) =>{
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

//404 Page
app.use((req,res) =>{
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen (PORT , () => {
    console.log(`Server running on port ${PORT}`);
})