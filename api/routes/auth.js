import express from "express"
import { register, login, logout, getLoggedInUser, refresh } from "../controllers/auth.js"
import { verifyToken, verifyUser } from "../utils/verify.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.post('/refresh',verifyUser, refresh)
router.get("/user",verifyUser, getLoggedInUser)


export default router