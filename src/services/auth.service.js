const db = require("../configs/db.config");
const User = db.user;
const Api404Error = require("../utils/error/api404.error.util");

// GET Auth -- Get User
async function get(uid) {
  const user = await User.findOne({
    where: { firebaseId: uid },
  });

  if (!user) {
    throw new Api404Error(`User with firebase id: ${uid} not found`);
  }

  return user;
}

// POST Auth -- Create User
async function post(uid, newUser) {
  await User.create({
    firebaseId: uid,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
  });

  console.log("User Created");

  const returnUser = await get(uid);
  return returnUser;
}

// PUT Auth -- Update User
async function put(uid, editUser) {
  const updateUser = await User.findOne({ where: { firebaseId: uid } });

  updateUser.set({
    email: editUser.email,
  });

  await updateUser.save();

  const returnUser = await get(uid);
  return returnUser;
}

module.exports = {
  get,
  post,
  put,
};
