const request = require('supertest');
const app = require('../src/app');
const Producto = require('../src/models/Producto');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

jest.mock('../src/models/Producto');

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

describe('Pruebas en el Controlador de Productos', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debe obtener la lista de productos (200)', async () => {
        const mockProductos = [{ nombre: 'Laptop', precio: 1000 }];
        Producto.find.mockResolvedValue(mockProductos);

        const res = await request(app).get('/api/productos');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(mockProductos);
    });
});