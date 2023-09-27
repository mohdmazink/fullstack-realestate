import express from "express";
import {
  createResidency,
  getAllresidencies,
  getResidency,
} from "../controllers/residencyController.js";

const router = express.Router();
router.post("/create", createResidency);
router.get("/allreidencies", getAllresidencies);
router.get("/:id", getResidency);

export { router as residencyRoute };
