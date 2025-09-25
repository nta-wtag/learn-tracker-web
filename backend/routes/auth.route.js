import express from 'express';
import { login, logout, signup, authCheck } from '../controller/auth.controller.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', signup);
router.post('/logout', logout);

// router.get('/authCheck', protectRoute, authCheck);

export default router;