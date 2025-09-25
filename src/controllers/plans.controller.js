// src/controllers/plans.controller.js
import Plan from '../models/Plans.js';

const toBool = v => /^true$/i.test(String(v));
const toNum  = (v, d) => (Number.isFinite(Number(v)) ? Number(v) : d);

export const list = async (req, res, next) => {
  try {
    const {
      q,
      priceMin, priceMax,
      os,               
      minRating,
      feature,
      vendorName,     
      active,
      sort = 'createdAt',
      dir  = 'desc',
      page = '1',
      limit = '50'
    } = req.query;

    const filter = {};

    if (q) filter.$text = { $search: q };               // o regex en name si preferís
    if (vendorName) filter.vendorName = new RegExp(vendorName, 'i');

    if (os) {
      const items = String(os).split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
      filter.os = items.length > 1 ? { $in: items } : items[0];
    }

    if (priceMin || priceMax) {
      filter.price = {
        ...(priceMin ? { $gte: Number(priceMin) } : {}),
        ...(priceMax ? { $lte: Number(priceMax) } : {})
      };
    }

    if (minRating) filter.rating = { $gte: Number(minRating) };
    if (typeof active !== 'undefined') filter.active = toBool(active);
    if (feature) filter.features = new RegExp(String(feature), 'i');

    const pageNum  = Math.max(1, toNum(page, 1));
    const limitNum = Math.max(1, Math.min(100, toNum(limit, 50)));
    const skip     = (pageNum - 1) * limitNum;
    const dirNum   = String(dir).toLowerCase() === 'asc' ? 1 : -1;

    const [data, total] = await Promise.all([
      Plan.find(filter)
        .sort({ [sort]: dirNum })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Plan.countDocuments(filter)
    ]);

    res.json({ total, page: pageNum, limit: limitNum, sort, dir: dirNum === 1 ? 'asc' : 'desc', data });
  } catch (e) { next(e); }
};

export const getOne = async (req, res, next) => {
  try {
    const p = await Plan.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Plan no encontrado' });
    res.json(p);
  } catch (e) { next(e); }
};

export const create = async (req, res, next) => {
  try {
    const doc = await Plan.create(req.body);
    res.status(201).json(doc);
  } catch (e) { next(e); }
};

export const update = async (req, res, next) => {
  try {
    const doc = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ message: 'Plan no encontrado' });
    res.json(doc);
  } catch (e) { next(e); }
};

export const remove = async (req, res, next) => {
  try {
    const doc = await Plan.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Plan no encontrado' });
    res.json({ message: 'Plan eliminado' });
  } catch (e) { next(e); }
};
