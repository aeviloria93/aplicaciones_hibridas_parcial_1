# API REST — Protec-Viotic (Planes de Antivirus)

API para gestionar **proveedores** (`/api/vendors`) y **planes** (`/api/plans`). Incluye `/api/users` como extra (CRUD con contraseñas hasheadas).

## Stack
- Node.js + Express
- MongoDB + Mongoose
- Postman/Thunder para pruebas

## Requisitos
- Node 18+
- MongoDB local

## Instalación
```bash
git clone https://github.com/[tu-usuario]/[tu-repo].git
cd [completar]
npm install

-Configuración

Crear un archivo .env en la raíz:
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/parcial_hibridas

Ejecutar 

npm run dev 
npm start    
Home: http://localhost:3000/

Datos del Proyecto
Alumno: Alejandro Rivera
Materia: Aplicaciones Híbridas
Comisión: DWN4AV
Profesor: Cruz Jonathan Emanuel