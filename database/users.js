const { ObjectId } = require('mongodb');
const db = require('./db');

const getAllUsers = async () => {
  return await db.users.find().toArray();
};

const getUserByName = async (name) => {
  return await db.users.findOne({ name: name });
};

const createUser = async (user) => {
  const result = await db.users.insertOne(user);
  return { ...user, _id: result.insertedId };
};

module.exports = {
  getAllUsers,
  getUserByName,
  createUser,
  /*
  updateUser,
  */
};
