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

const updateUser = async (userId, updatedUserData) => {
  try {
    const result = await db.users.updateOne(
      { _id: new ObjectId(userId) },
      { $set: updatedUserData }
    );

    if (result.modifiedCount === 0) {
      return null;
    }

    return { ...updatedUserData, _id: new ObjectId(userId) };
  } catch (error) {
    throw new Error('Failed to update user');
  }
};

module.exports = {
  getAllUsers,
  getUserByName,
  createUser,
  updateUser,
};
