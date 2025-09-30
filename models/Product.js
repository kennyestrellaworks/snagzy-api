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

const productSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    storeId: {
      type: String,
      required: true,
      ref: "Store",
    },
    ownerId: {
      type: String,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    categories: [
      {
        type: String,
        ref: "Category",
      },
    ],
    tags: [
      {
        type: String,
        ref: "Tag",
      },
    ],
    variants: [
      {
        type: String,
        ref: "Variant",
      },
    ],
    gallery: [
      {
        type: String,
        match: /^https?:\/\/.+/,
      },
    ],
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    rating: ratingSchema,
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
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
productSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Index for better query performance
productSchema.index({ storeId: 1 });
productSchema.index({ ownerId: 1 });
productSchema.index({ categories: 1 });
productSchema.index({ tags: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ isFeatured: 1 });

export default mongoose.model("Product", productSchema);
