import Vendor from '../models/Vendor.js';

//Lista con filtros y busqueda
export const list = async (req, res, next) => {
  try {
    const { q, country, minRating, active } = req.query;
    const filter = {};
    if (q) filter.$text = { $search: q };         
    if (country) filter.country = new RegExp(`^${country}$`, 'i');
    if (minRating) filter.rating = { $gte: Number(minRating) };
    if (typeof active !== 'undefined') filter.active = /^true$/i.test(active);
    const data = await Vendor.find(filter).sort({ name: 1 });
    res.json(data);
  } catch (e) { next(e); }
};

//Obtener por ID
export const getOne = async (req, res, next) => {
  try {
    const v = await Vendor.findById(req.params.id);
    if (!v) return res.status(404).json({ message: 'Proveedor no encontrado' });
    res.json(v);
  } catch (e) { next(e); }
};

//Crear
export const create = async (req, res, next) => {
  try { const v = await Vendor.create(req.body); res.status(201).json(v); }
  catch (e) { next(e); }
};

//Actiualizar
export const update = async (req, res, next) => {
  try {
    const v = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!v) return res.status(404).json({ message: 'Proveedor no encontrado' });
    res.json(v);
  } catch (e) { next(e); }
};

//Eliminar
export const remove = async (req, res, next) => {
  try {
    const v = await Vendor.findByIdAndDelete(req.params.id);
    if (!v) return res.status(404).json({ message: 'Proveedor no encontrado' });
    res.json({ message: 'Proveedor eliminado' });
  } catch (e) { next(e); }
};