import express from "express"
import { getCustomers, getCustomerById, updateCustomerById, deleteCustomerById} from "../controllers/customer.controller.js"
import {upload, uploadCustomersCSV} from "../controllers/csvUpload.controller.js"
import { verifyUser } from "../utils/verify.js"

const router = express.Router()

//CREATE
router.post('/uploadCustomer', verifyUser, upload.single('file'), uploadCustomersCSV);
//GET ALL CONTACT
router.get('/allCustomers',verifyUser, getCustomers);
//GET CONTACT BY ID
router.get('/getOneCustomer/:id',verifyUser, getCustomerById);
// UPDATE CONTACT
router.put('/updateCustomer/:id',verifyUser,updateCustomerById);
// DELETE CONTACT
router.delete('/deleteCustomer/:id',verifyUser, deleteCustomerById);

export default router
