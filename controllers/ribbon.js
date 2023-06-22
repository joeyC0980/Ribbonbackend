import Ribbon from "../models/Ribbon.js";
import { createError } from "../utils/error.js";

export const createRibbon = async (req, res, next) => {
  const ribbonId = req.params.ribbonid;
  const newRibbon = new Ribbon(req.body);

  try {
    const savedRibbon = await newRibbon.save();
    try {
      await Ribbon.findByIdAndUpdate(ribbonId, {
        $push: { ribbons: savedRibbon._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRibbon);
  } catch (err) {
    next(err);
  }
};

export const updateRibbon = async (req, res, next) => {
  try {
    const updatedRibbon = await Ribbon.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRibbon);
  } catch (err) {
    next(err);
  }
};
export const updateRibbonAvailability = async (req, res, next) => {
  try {
    await Ribbon.updateOne(
      { "ribbonNumbers._id": req.params.id },
      {
        $push: {
          "ribbonNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Ribbon status has been updated.");
  } catch (err) {
    next(err);
  }
};
export const deleteRibbon = async (req, res, next) => {
  const ribbonId = req.params.ribbonid;
  try {
    await Ribbon.findByIdAndDelete(req.params.id);
    try {
      await Ribbon.findByIdAndUpdate(ribbonId, {
        $pull: { ribbons: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Ribbon has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getRibbon = async (req, res, next) => {
  try {
    const ribbon = await Ribbon.findById(req.params.id);
    res.status(200).json(ribbon);
  } catch (err) {
    next(err);
  }
};
export const getRibbons = async (req, res, next) => {
  try {
    const ribbons = await Ribbon.find();
    res.status(200).json(ribbons);
  } catch (err) {
    next(err);
  }
};