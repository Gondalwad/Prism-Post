import express from 'express';
import test, { deleteUser,updateUser } from '../controllers/user.controlls.js'
import { verifyUser } from '../utils/verifyUser.js';
const router = express.Router();

router.get('/test',test);
router.put('/update/:userID',verifyUser,updateUser);
router.delete('/delete/:userID',verifyUser,deleteUser);
export default router;