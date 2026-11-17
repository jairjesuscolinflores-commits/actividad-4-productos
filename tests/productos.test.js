const request = require('supertest');
const app = require('../src/app');
const Producto = require('../src/models/Producto');

jest.mock('../src/models/Producto');

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