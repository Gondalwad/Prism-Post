import express from 'express';
import test from '../controllers/user.controlls.js'
import { updateUser } from '../controllers/user.controlls.js';
import { verifyUser } from '../utils/verifyUser.js';
const router = express.Router();

router.get('/test',test);
router.put('/update/:userID',verifyUser,updateUser);

export default router;