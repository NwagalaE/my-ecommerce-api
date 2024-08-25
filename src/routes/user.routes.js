"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const router = (0, express_1.Router)();
// Route for registering a new user
router.post('/register', users_controller_1.registerUserController);
// Route for logging in a user
router.post('/login', users_controller_1.loginUserController);
// Route for updating user details
router.put('/update/:userId', users_controller_1.updateUserController);
// Route for requesting an OTP
router.post('/request-otp', users_controller_1.requestOTPController);
// Route for verifying the OTP
router.post('/verify-otp', users_controller_1.verifyOTPController);
exports.default = router;
