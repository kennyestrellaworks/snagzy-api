import mongoose from "mongoose";

const navLinkItemsSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  icon: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const navLinkSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    navLinkItems: [navLinkItemsSchema],
    settings: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Update the updatedAt field before saving
navLinkSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model("NavLink", navLinkSchema);
