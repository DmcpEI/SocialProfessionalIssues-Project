const express = require('express');
const router = express.Router();
const { getAllUsers, getUserByName, createUser, updateUser, } = require('../database/users');

// Get all users
router.get('/', async (req, res) => {
  const users = await getAllUsers();
  res.send({ status: 'OK', data: users });
});

// Create a user
router.post('/', async (req, res) => {
  try {
    const userData = req.body;

    if (!userData.name || !userData.email || !userData.password || !userData.birthdate || !userData.country || !userData.passport) {
      return res.status(400).send({ status: 'FAILED', error: 'Missing required fields' });
    }

    const newUser = await createUser(userData);

    res.status(201).send({ status: 'OK', redirect: '/login' });
  } catch (error) {
    res.status(500).send({ status: 'FAILED', error: 'Internal server error' });
  }
});

// POST route for user login
router.post('/login', async (req, res) => {
  const { name, password, email } = req.body;

  try {
    const user = await getUserByName(name);

    if (!user) {
      return res.status(401).json({ message: 'Invalid name' });
    }
    if (password.toString() !== user.password) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    if (email.toString() !== user.email) {
      return res.status(401).json({ message: 'Invalid email' });
    }

    res.send({ status: 'OK', user, redirect: '/users/login' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/login', (req, res) => {
  const { user } = req.query;
  res.render('index', { user: user ? JSON.parse(user) : null });
});

// POST route for user page
router.post('/userPage', async (req, res) => {
  const { user } = req.body;

  try {
    if (!user) {
      return res.status(401).json({ message: 'No user' });
    }

    res.send({ status: 'OK', user: user, redirect: '/users/userPage' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/userPage', (req, res) => {
  const { user } = req.query;
  res.render('user', { user: user ? JSON.parse(user) : null });
});

//Update a user
router.put('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUserData = req.body;

    if (!updatedUserData.username || !updatedUserData.email || !updatedUserData.password) {
      return res.status(400).send({ status: 'FAILED', error: 'Missing required fields' });
    }

    const updatedUser = await updateUser(userId, updatedUserData);

    if (!updatedUser) {
      return res.status(404).send({ status: 'FAILED', error: 'User not found' });
    }

    res.render('index', { user: updatedUser ? JSON.parse(updatedUser) : null });
  } catch (error) {
    res.status(500).send({ status: 'FAILED', error: 'Internal server error' });
  }
});

module.exports = router;
