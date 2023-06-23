import mongoose from "mongoose";
const RibbonSchema = new mongoose.Schema(
  {
    photos: {
      type: [String],
    },
    title: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ribbon", RibbonSchema);