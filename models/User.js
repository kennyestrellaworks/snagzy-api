import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    match: /^\+63[0-9]{10,12}$/,
  },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
});

const emergencyContactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    required: true,
  },
  suffix: {
    type: String,
    default: "",
  },
  relation: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    match: /^\+63[0-9]{10,12}$/,
  },
});

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    middleName: {
      type: String,
      default: "",
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    suffix: {
      type: String,
      default: "",
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
    contact: [contactSchema],
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    emergencyContact: [emergencyContactSchema],
    image: {
      type: String,
      match: /^https?:\/\/.+/,
    },
    employment: [
      {
        type: mongoose.Schema.Types.Mixed,
      },
    ],
    education: [
      {
        type: mongoose.Schema.Types.Mixed,
      },
    ],
    shopLimit: {
      type: Number,
      default: 1,
      min: 0,
    },
    shop: [
      {
        type: String,
        ref: "Store",
      },
    ],
    birthDate: {
      type: Date,
      required: true,
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
userSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model("User", userSchema);
