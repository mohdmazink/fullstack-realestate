import express from "express";
import {
  createResidency,
  getAllresidencies,
} from "../controllers/residencyController.js";

const router = express.Router();
router.post("/create", createResidency);
router.get("/allreidencies", getAllresidencies);

export { router as residencyRoute };
