const express = require("express");
const usersController = require("./users.controller");

const router = express.Router();

router.post("/login", usersController.login);

router.post("/signUp", usersController.signUp);

router.post("/getUsers", usersController.getUsers);

router.post("/rateUser/:userId", usersController.rateUser);

router.post("/editUser/:userId", usersController.editUser);

router.post("/deleteUser/:userId", usersController.deleteUser);

router.post("/updateBalance/:userId",usersController.updateBalance);

module.exports = router;
