import express from "express"
import { register, login, logout, getLoggedInUser } from "../controllers/auth.js"
import { verifyUser } from "../utils/verify.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/loggedUser",verifyUser ,getLoggedInUser)


export default router