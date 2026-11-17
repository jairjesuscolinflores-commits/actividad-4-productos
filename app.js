const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const productoRoutes = require('./src/routes/productoRoutes');

const app = express();

// Middlewares base
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public')); 

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/productos', productoRoutes);

// Ruta básica de prueba
app.get('/', (req, res) => {
    res.send('API de Gestión de Productos funcionando 🚀');
});

// Middleware para manejo de errores global (Error Card #7)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error interno del servidor', error: err.message });
});

module.exports = app;