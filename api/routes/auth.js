import express from "express"
import { register, login, logout, getLoggedInUser, refresh } from "../controllers/auth.js"
import { auth } from "../utils/auth.js"
import { verifyUser } from "../utils/verify.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.post('/refresh', refresh)
router.get("/actualUser",verifyUser, getLoggedInUser)


export default router