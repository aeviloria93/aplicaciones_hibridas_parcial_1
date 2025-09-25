import 'dotenv/config';
import mongoose from 'mongoose';
import app from './src/app.js';

const PORT = process.env.PORT || 3000;
const URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/parcial_hibridas';

await mongoose.connect(URI);
console.log('✅ Mongo conectado');
app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`));

const { host, port, name } = mongoose.connection;
console.log(`✅ Mongo conectado a ${host}:${port}/${name}`);