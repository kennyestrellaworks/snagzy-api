import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  parentId: {
    type: String,
    ref: 'Category',
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Update the updatedAt field before saving
categorySchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Index for better query performance
categorySchema.index({ parentId: 1 });
categorySchema.index({ isActive: 1 });
// slug index is automatically created by unique: true

export default mongoose.model('Category', categorySchema);
