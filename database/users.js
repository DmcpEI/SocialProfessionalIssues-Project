const { ObjectId } = require('mongodb');
const db = require('./db');

const getAllUsers = async () => {
  return await db.users.find().toArray();
};

const getUserById = async (id) => {
  return await db.users.findOne({ _id: new ObjectId(id) });
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
  getUserById,
  getUserByName,
  createUser,
  /*
  updateUser,
  */
};
