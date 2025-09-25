import bcrypt from 'bcryptjs';
import User from '../models/Users.js';

const toBool = v => /^true$/i.test(String(v));

export const list = async (req, res, next) => {
  try {
    const { q, role, active } = req.query;
    const filter = {};
    if (q) filter.$or = [
      { name: new RegExp(q, 'i') },
      { email: new RegExp(q, 'i') }
    ];
    if (role) filter.role = new RegExp(`^${role}$`, 'i');
    if (typeof active !== 'undefined') filter.active = toBool(active);

    const users = await User.find(filter).sort({ createdAt: -1 }).select('-passwordHash');
    res.json(users);
  } catch (e) { next(e); }
};

export const getOne = async (req, res, next) => {
  try {
    const u = await User.findById(req.params.id).select('-passwordHash');
    if (!u) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(u);
  } catch (e) { next(e); }
};

export const create = async (req, res, next) => {
  try {
    const { name, email, password, role, active } = req.body;
    if (!password || String(password).length < 6) {
      return res.status(400).json({ message: 'Password requerido (mínimo 6 caracteres)' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash, role, active });
    res.status(201).json(user); // toJSON ya oculta passwordHash
  } catch (e) { next(e); }
};

export const update = async (req, res, next) => {
  try {
    const updateDoc = { ...req.body };
    // si mandan password, la hasheamos y guardamos en passwordHash
    if (updateDoc.password) {
      if (String(updateDoc.password).length < 6) {
        return res.status(400).json({ message: 'Password mínimo 6 caracteres' });
      }
      updateDoc.passwordHash = await bcrypt.hash(updateDoc.password, 10);
      delete updateDoc.password; // no persistir campo password
    }

    const u = await User.findByIdAndUpdate(
      req.params.id,
      updateDoc,
      { new: true, runValidators: true }
    ).select('-passwordHash');

    if (!u) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(u);
  } catch (e) { next(e); }
};

export const remove = async (req, res, next) => {
  try {
    const u = await User.findByIdAndDelete(req.params.id);
    if (!u) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado' });
  } catch (e) { next(e); }
};
