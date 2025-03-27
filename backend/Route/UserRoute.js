const express = require("express");
const {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  findUserByUsername,
} = require("../Controller/userController");

const router = express.Router();

// Get all users
router.get("/", getAllUsers);

// Get a single user by ID
router.get("/:id", getUserById);

// Update a user by ID
router.put("/:id", updateUserById);

// Delete a user by ID
router.delete("/:id", deleteUserById);

router.get("/username/:username", findUserByUsername);

module.exports = router;