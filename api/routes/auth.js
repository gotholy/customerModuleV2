import express from "express"
import { register, login, logout, getUserById } from "../controllers/auth.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.post("/user/:id", getUserById)


export default router