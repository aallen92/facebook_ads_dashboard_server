const authService = require("../services/auth.service");

// GET Auth -- Get User
async function get(req, res, next) {
  const uid = res.locals.uid;
  try {
    res.json(await authService.get(uid));
  } catch (error) {
    next(error);
  }
}

// POST Auth -- Create User
async function post(req, res, next) {
  const uid = res.locals.uid;
  const newUser = req.body.newUser;
  try {
    const user = await authService.post(uid, newUser);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

// PUT Auth -- Update User
async function put(req, res, next) {
  const uid = res.locals.uid;
  const editUser = req.body.editUser;

  try {
    res.json(await authService.put(uid, editUser));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  get,
  post,
  put,
};
