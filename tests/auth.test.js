const request = require('supertest');
const app = require('../src/app');
const Usuario = require('../src/models/Usuario');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

jest.mock('../src/models/Usuario');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Pruebas en el Controlador de Autenticación', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debe registrar un usuario exitosamente (201)', async () => {
        Usuario.findOne.mockResolvedValue(null);
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