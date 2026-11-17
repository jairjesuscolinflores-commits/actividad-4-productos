require('dotenv').config();
const app = require('./app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 3000;

// Conectar a la BD
connectDB();

// Iniciar servidor
app.listen(PORT, () => {
    console.log(` Servidor corriendo en el puerto ${PORT}`);
});