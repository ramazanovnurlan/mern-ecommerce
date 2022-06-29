import express from "express";
import {
  getAllRegisters,
  Register,
} from "../controllers/registerController.js";

const router = express.Router();

router.post("/allRegisters", getAllRegisters);
router.post("/", Register);

export default router;
