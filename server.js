const express = require ('express');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();

//Acess to static files
app.use('/public', express.static(path.join(__dirname,'public')));

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