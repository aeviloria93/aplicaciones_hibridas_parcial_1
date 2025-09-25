import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const emailRegex = /^\S+@\S+\.\S+$/;
const ROLES = ['admin', 'user'];

const UserSchema = new Schema({
  name:       { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
  email:      { type: String, required: true, trim: true, lowercase: true, unique: true, match: [emailRegex, 'Email inválido'] },
  passwordHash: { type: String, required: true }, // nunca guardes el password en claro
  role:       { type: String, enum: ROLES, default: 'user' },
  active:     { type: Boolean, default: true }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => { delete ret.passwordHash; return ret; }
  },
  toObject: {
    transform: (doc, ret) => { delete ret.passwordHash; return ret; }
  }
});

// Búsqueda por nombre / email
UserSchema.index({ name: 'text', email: 'text' });

export default model('User', UserSchema);
