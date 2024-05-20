import express from "express"
import { register, login, logout, getLoggedInUser, refresh } from "../controllers/auth.js"
import { auth } from "../utils/auth.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.post('/refresh', refresh)
router.get("/actualUser",auth, getLoggedInUser)


export default router