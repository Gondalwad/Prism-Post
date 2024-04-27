import express from 'express';
import test, { deleteUser,updateUser,signOutApi } from '../controllers/user.controlls.js'
import { verifyUser } from '../utils/verifyUser.js';
const router = express.Router();

router.get('/test',test);
router.put('/update/:userID',verifyUser,updateUser);
router.delete('/delete/:userID',verifyUser,deleteUser);
router.post('/signout',signOutApi)
export default router;