const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRouter = require('./router/userRouter');
const flightRouter = require('./router/flightRouter');
const hotelRouter = require('./router/hotelRouter');
const overlandRouter = require('./router/overlandRouter');

const { getAllOrigins, getAllDestinations, } = require('./database/trips');

const app = express();

const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(cors());

app.use('/users', userRouter);
app.use('/flights', flightRouter);
app.use('/hotels', hotelRouter);
app.use('/overlands', overlandRouter);

app.get('/', async (req, res) => {
    try {
      const origins = await getAllOrigins(); // Fetch origin data from the database
      const destinations = await getAllDestinations(); // Fetch destinations data from the database
  
      res.render('index', { origins, destinations }); // Pass the origins and destinations data to the EJS template
    } catch (error) {
      // Handle errors
      res.status(500).send('Internal Server Error');
    }
  });

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/payment', (req, res) => {
  res.render('payment');
});

// 404 Page
app.use((req, res) => {
    res.status(404).render('404');
});

app.listen (PORT , () => {
    console.log(`Server running on port ${PORT}`);
})