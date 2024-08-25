import { Router } from 'express';
import {
    registerUserController,
    loginUserController,
    updateUserController,
    requestOTPController,
    verifyOTPController
} from '../controllers/users.controller';
import validateRequest from '../middleware/validateRequest';
import {
    createUserSchema,
    updateUserSchema,
    loginUserSchema
} from '../schema/users.schema';

const router = Router();

// Route for registering a new user
router.post('/register', 
    validateRequest(createUserSchema),
    registerUserController);

// Route for logging in a user
router.post('/login', 
    validateRequest(loginUserSchema),
    loginUserController);

// Route for updating user details
router.put('/update/:userId', 
    validateRequest(updateUserSchema),
    updateUserController);

// Route for requesting an OTP
router.post('/request-otp', requestOTPController);

// Route for verifying the OTP
router.post('/verify-otp', verifyOTPController);

export default router;