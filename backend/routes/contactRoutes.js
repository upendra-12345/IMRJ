import express from "express";


import {
createContact,
getAllContacts,
getContactById,
updateContactStatus,
deleteContact,
} from "../controllers/contactController.js";

import protectAdmin from "../middleware/protectAdmin.js";

const router = express.Router();

// Public route: Submit contact form
router.post("/", createContact);

// Protected admin routes
router.get("/admin", protectAdmin, getAllContacts);

router.get("/admin/:id", protectAdmin, getContactById);

router.patch("/admin/:id/status", protectAdmin, updateContactStatus);

router.delete("/admin/:id", protectAdmin, deleteContact);

export default router;