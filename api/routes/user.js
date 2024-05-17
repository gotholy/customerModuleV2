import express from "express"
import { verifyUser } from "../utils/verify.js";
import { deleteUserById, getUserById, updateUserById } from "../controllers/user.js";

const router = express.Router()

//GET USER
router.get('/getUser/:id', verifyUser, getUserById);
// UPDATE USER
router.put('/updateUser/:id', verifyUser, updateUserById);
// DELETE USER
router.delete('/deleteUser/:id',verifyUser, deleteUserById);

export default router