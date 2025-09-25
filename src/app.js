import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import usersRoutes from './routes/users.routes.js';
import vendorsRoutes from './routes/vendors.routes.js';
import plansRoutes from './routes/plans.routes.js';
import errorMiddleware from './middlewares/error.middlewares.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR  = path.join(__dirname, 'pages');
const PUBLIC_DIR = path.join(__dirname, 'public');       

const app = express();
app.use(express.json());


app.use('/public', express.static(PUBLIC_DIR));           

app.get('/', (req, res, next) => {
  res.sendFile('index.html', { root: PAGES_DIR }, (err) => err && next(err));
});

app.use('/api/vendors', vendorsRoutes);
app.use('/api/plans', plansRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) return res.status(404).json({ message: 'Endpoint no encontrado' });
  next();
});

app.use(errorMiddleware);
export default app;
