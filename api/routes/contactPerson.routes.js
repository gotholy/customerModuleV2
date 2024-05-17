import express from "express"
import {getContactPersons, getContactPersonById, updateContactPersonById, deleteContactPersonById} from "../controllers/contactPerson.controller.js"
import { verifyUser } from "../utils/verify.js";
import { upload, uploadContactPersonsCSV } from "../controllers/csvUpload.controller.js";

const router = express.Router()

//CREATE
router.post('/uploadContacts',verifyUser,upload.single('file'), uploadContactPersonsCSV);
//GET ALL CONTACT
router.get('/getAllContacts',verifyUser,getContactPersons);
//GET CONTACT BY ID
router.get('/getContact/:id',verifyUser,getContactPersonById);
// UPDATE CONTACT
router.put('/updateContact/:id',verifyUser,updateContactPersonById);
// DELETE CONTACT
router.delete('/deleteContact/:id', verifyUser,deleteContactPersonById);

export default router