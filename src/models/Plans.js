// src/models/Plan.js
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const OS = ['windows', 'mac', 'linux', 'android', 'ios'];

const PlanSchema = new Schema({
  name:        { type: String, required: true, trim: true, minlength: 2, maxlength: 120 },
  vendorName:  { type: String, trim: true, maxlength: 120 }, // <- **texto**, no ref
  price:       { type: Number, required: true, min: 0 },
  os:          [{ type: String, enum: OS }],
  rating:      { type: Number, min: 0, max: 5, default: 0 },
  features:    [{ type: String, trim: true, maxlength: 40 }],
  description: { type: String, trim: true, maxlength: 300 },
  active:      { type: Boolean, default: true }
}, { timestamps: true });

// búsqueda por texto
PlanSchema.index({ name: 'text', description: 'text', vendorName: 'text' }, { weights: { name: 5 } });

export default model('Plan', PlanSchema);
