import mongoose from  "mongoose"

const { Schema, model } = mongoose;


const emailRegex = /^\S+@\S+\.\S+$/;
const phoneRegex = /^[0-9+\-\s()]{6,20}$/;


const VendorSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true, minlength: 2, maxlength: 80 },
  country: { type: String, trim: true, maxlength: 60 },
  supportEmail: { type: String, trim: true, lowercase: true, match: [emailRegex, 'Email inválido'] },
  phone: { type: String, trim: true, match: [phoneRegex, 'Teléfono inválido'] },
  supportHours: { type: String, trim: true, maxlength: 60 },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  active: { type: Boolean, default: true }
}, { timestamps: true });


VendorSchema.index({ name: 'text' });

export default model('Vendor', VendorSchema);