const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check, validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Ruta de Registro
router.post('/registro', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email válido').isEmail(),
    check('password', 'El password debe tener mínimo 6 caracteres').isLength({ min: 6 }),
    validarCampos
], authController.registrar);

// Ruta de Login
router.post('/login', [
    check('email', 'Agrega un email válido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], authController.login);

module.exports = router;