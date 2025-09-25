
export default (err, req, res, next) => {
  if (err instanceof SyntaxError && 'body' in err) return res.status(400).json({ message: 'JSON inválido' });
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ message: 'Validación fallida', errors });
  }
  if (err.name === 'CastError') return res.status(400).json({ message: 'ID inválido' });
  if (err.code === 11000) return res.status(409).json({ message: 'Registro duplicado', key: err.keyValue });
  console.error(err);
  res.status(500).json({ message: 'Error interno del servidor' });
};
