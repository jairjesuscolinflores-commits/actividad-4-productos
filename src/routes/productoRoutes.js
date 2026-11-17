const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const authMiddleware = require('../middlewares/authMiddleware');

// Ruta para obtener todos los productos
router.get('/', productoController.obtenerProductos);

// Ruta para crear un producto (Protegida)
router.post('/', authMiddleware, productoController.crearProducto);

// Ruta para actualizar un producto (Protegida)
router.put('/:id', authMiddleware, productoController.actualizarProducto);

// Ruta para eliminar un producto (Protegida)
router.delete('/:id', authMiddleware, productoController.eliminarProducto);

module.exports = router;