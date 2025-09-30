import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  average: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  count: {
    type: Number,
    default: 0,
    min: 0,
  },
});

const storeSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
      required: true,
      ref: "User",
    },
    storeName: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    logoUrl: {
      type: String,
      match: /^https?:\/\/.+/,
    },
    bannerUrl: {
      type: String,
      match: /^https?:\/\/.+/,
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "inactive", "suspended", "pending"],
    },
    rating: ratingSchema,
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
  },
  {
    timestamps: true,
  }
);

// Update the updatedAt field before saving
storeSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Index for better query performance
storeSchema.index({ ownerId: 1 });
storeSchema.index({ status: 1 });
storeSchema.index({ isActive: 1 });
// slug index is automatically created by unique: true

export default mongoose.model("Store", storeSchema);
