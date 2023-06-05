const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, /*getUserByUsername, createUser, updateUser*/ } = require('../database/users');

// Get all users
router.get('/', async (req, res) => {
  const users = await getAllUsers();
  res.send({ status: 'OK', data: users });
});

// Get user with a certain id
router.get('/:userId', async (req, res) => {
  try {
    const user = await getUserById(req.params.userId);

    if (!user) {
      res.status(404).send({ status: 'FAILED', error: 'User not found' });
      return;
    }

    res.send({ status: 'OK', data: user });
  } catch (e) {
    res.status(401).send({ status: 'FAILED', error: e.message });
  }
});

/*
// Get user with a certain username
router.get('/username/:userUsername', async (req, res) => {
  try {
    const user = await getUserByUsername(req.params.userUsername);

    if (!user) {
      res.status(404).send({ status: 'FAILED', error: 'User not found' });
      return;
    }

    res.send({ status: 'OK', data: user });
  } catch (e) {
    res.status(401).send({ status: 'FAILED', error: e.message });
  }
});

// Create a user
router.post('/', async (req, res) => {
  try {
    const userData = req.body;

    if (!userData.username || !userData.email || !userData.password) {
      return res.status(400).send({ status: 'FAILED', error: 'Missing required fields' });
    }

    const newUser = await createUser(userData);

    res.status(201).send({ status: 'OK', data: newUser });
  } catch (error) {
    res.status(500).send({ status: 'FAILED', error: 'Internal server error' });
  }
});

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

    res.status(201).send({ status: 'OK', data: updatedUser });
  } catch (error) {
    res.status(500).send({ status: 'FAILED', error: 'Internal server error' });
  }
});

// POST route for user login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await getUserByUsername(username);

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    if (password.toString() !== user.password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.status(201).send({ status: 'OK', data: user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
*/

module.exports = router;
