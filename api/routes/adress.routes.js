import express from "express"
import {getAddresses,getAddressById,updateAddressById,deleteAddressById} from "../controllers/adresse.controller.js"
import { upload, uploadAddressesCSV } from "../controllers/csvUpload.controller.js";
import { verifyUser } from "../utils/verify.js";

const router = express.Router()

//CREATE
router.post('/uploadAddresses',verifyUser, upload.single('file'), uploadAddressesCSV);
//GET ALL ADDRESSES
router.get('/allAddresses',verifyUser, getAddresses);
//GET ADDRESS BY ID
router.get('/getOneAddresse/:id',verifyUser, getAddressById);
// UPDATE ADRESS
router.put('/updateAddresse/:id', verifyUser,updateAddressById);
// DELETE ADRESS
router.delete('/deleteAddresse/:id', verifyUser,deleteAddressById);

export default router