const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Auth Middleware - Make sure that the request is from an authenticated user and stores their uid in res.locals
router.use(authMiddleware);

// GET Auth -- Get User
router.get("/", authController.get);

// POST Auth -- Create User
router.post("/", authController.post);

// PUT Auth -- Update User
router.put("/", authController.put);

module.exports = router;
