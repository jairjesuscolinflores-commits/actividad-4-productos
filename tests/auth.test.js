const request = require('supertest');
const app = require('../src/app');
const Usuario = require('../src/models/Usuario');

// 1. Mockeamos la conexión a la base de datos para que no intente conectarse en la nube
jest.mock('../src/config/db', () => jest.fn());
// 2. Mockeamos el modelo de Usuario
jest.mock('../src/models/Usuario');

describe('Pruebas en el Controlador de Autenticación', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debe registrar un usuario exitosamente (201)', async () => {
        // Simulamos que el usuario no existe en la BD
        Usuario.findOne.mockResolvedValue(null);
        // Simulamos que el usuario se guarda correctamente
        Usuario.prototype.save = jest.fn().mockResolvedValue({});

        const res = await request(app)
            .post('/api/auth/registro')
            .send({
                nombre: 'Test User',
                email: 'test@test.com',
                password: 'password123'
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Usuario registrado exitosamente');
    });

    test('Debe fallar si el email ya está registrado (400)', async () => {
        // Simulamos que el usuario YA existe
        Usuario.findOne.mockResolvedValue({ email: 'test@test.com' });

        const res = await request(app)
            .post('/api/auth/registro')
            .send({
                nombre: 'Test User',
                email: 'test@test.com',
                password: 'password123'
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('El email ya está registrado');
    });
});