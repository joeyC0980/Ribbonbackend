import express from "express";
import {
  createRibbon,
  deleteRibbon,
  getRibbon,
  getRibbons,
  updateRibbon,
  updateRibbonAvailability,
} from "../controllers/ribbon.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createRibbon);

// UPDATE
router.put("/:id", verifyAdmin, updateRibbon);

// DELETE
router.delete("/:id", verifyAdmin, deleteRibbon);

// GET
router.get("/find/:id", getRibbon);

// GET ALL
router.get("/", getRibbons);

export default router;
