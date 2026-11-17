const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    }
});

// Middleware para encriptar la contraseña antes de guardarla (Solución Error Card #3)
// NOTA: En Mongoose 9+, 'next' ya no se usa como parámetro aquí.
usuarioSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Método para comparar contraseñas en el login
usuarioSchema.methods.compararPassword = async function(passwordRecibido) {
    return await bcrypt.compare(passwordRecibido, this.password);
};

module.exports = mongoose.model('Usuario', usuarioSchema);