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
//CREATE
router.post("/:ribbonid", verifyAdmin, createRibbon);

//UPDATE
router.put("/availability/:id", updateRibbonAvailability);
router.put("/:id", verifyAdmin, updateRibbon);
//DELETE
router.delete("/:id/:ribbonid", verifyAdmin, deleteRibbon);
//GET

router.get("/:id", getRibbon);
//GET ALL

router.get("/", getRibbons);

export default router;