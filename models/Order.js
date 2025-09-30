import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    ref: "Product",
  },
  storeId: {
    type: String,
    required: true,
    ref: "Store",
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  itemPrice: {
    type: Number,
    required: true,
    min: 0,
  },
});

const orderSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    buyerId: {
      type: String,
      required: true,
      ref: "User",
    },
    items: [itemSchema],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      required: true,
      enum: [
        "pending",
        "confirmed",
        "processed",
        "checked out",
        "shipped",
        "delivered",
        "cancelled",
        "refunded",
      ],
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["pending", "paid", "failed", "refunded"],
    },
    shippingAddress: {
      type: String,
      required: true,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
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
orderSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Index for better query performance
orderSchema.index({ buyerId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ createdAt: -1 });

export default mongoose.model("Order", orderSchema);
