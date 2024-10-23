"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const index_1 = __importDefault(require("../index")); // Adjust the import according to your file structure
// Mocking the fetch function
globalThis.fetch = vitest_1.vi.fn();
// Sample success response
const successResponse = { data: 'Success data' };
// Sample error response
const errorResponse = {
    errors: [{ message: 'Something went wrong' }],
};
(0, vitest_1.describe)('ApiService', () => {
    let apiService;
    (0, vitest_1.beforeEach)(() => {
        // Initialize before each test
        apiService = new index_1.default('test-token', 'https://api.example.com');
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.it)('should make a GET request successfully', async () => {
        // @ts-ignore
        fetch.mockResolvedValue({
            ok: true,
            json: async () => successResponse,
        });
        const result = await apiService.get('/test-endpoint');
        (0, vitest_1.expect)(result).toEqual(successResponse);
        (0, vitest_1.expect)(fetch).toHaveBeenCalledWith('https://api.example.com/test-endpoint', vitest_1.expect.objectContaining({
            method: 'GET',
            headers: vitest_1.expect.any(Object),
        }));
    });
    (0, vitest_1.it)('should handle GET request errors', async () => {
        // @ts-ignore
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
            json: async () => errorResponse,
        });
        await (0, vitest_1.expect)(apiService.get('/test-endpoint')).rejects.toThrow('Something went wrong');
        (0, vitest_1.expect)(fetch).toHaveBeenCalledWith('https://api.example.com/test-endpoint', vitest_1.expect.objectContaining({
            method: 'GET',
            headers: vitest_1.expect.any(Object),
        }));
    });
    (0, vitest_1.it)('should make a POST request successfully', async () => {
        // @ts-ignore
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => successResponse,
        });
        const result = await apiService.post('/test-endpoint', { test: true });
        (0, vitest_1.expect)(result).toEqual(successResponse);
        (0, vitest_1.expect)(fetch).toHaveBeenCalledWith('https://api.example.com/test-endpoint', vitest_1.expect.objectContaining({
            method: 'POST',
            headers: vitest_1.expect.any(Object),
            body: JSON.stringify({ test: true }),
        }));
    });
    (0, vitest_1.it)('should handle POST request errors', async () => {
        // @ts-ignore
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
            json: async () => errorResponse,
        });
        await (0, vitest_1.expect)(apiService.post('/test-endpoint', { test: true })).rejects.toThrow('Something went wrong');
        (0, vitest_1.expect)(fetch).toHaveBeenCalledWith('https://api.example.com/test-endpoint', vitest_1.expect.objectContaining({
            method: 'POST',
            headers: vitest_1.expect.any(Object),
            body: JSON.stringify({ test: true }),
        }));
    });
    // Similar tests can be added for PUT and DELETE
    (0, vitest_1.it)('should make a PUT request successfully', async () => {
        // @ts-ignore
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => successResponse,
        });
        const result = await apiService.put('/test-endpoint', { update: true });
        (0, vitest_1.expect)(result).toEqual(successResponse);
        (0, vitest_1.expect)(fetch).toHaveBeenCalledWith('https://api.example.com/test-endpoint', vitest_1.expect.objectContaining({
            method: 'PUT',
            headers: vitest_1.expect.any(Object),
            body: JSON.stringify({ update: true }),
        }));
    });
    (0, vitest_1.it)('should handle PUT request errors', async () => {
        // @ts-ignore
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
            json: async () => errorResponse,
        });
        await (0, vitest_1.expect)(apiService.put('/test-endpoint', { update: true })).rejects.toThrow('Something went wrong');
        (0, vitest_1.expect)(fetch).toHaveBeenCalledWith('https://api.example.com/test-endpoint', vitest_1.expect.objectContaining({
            method: 'PUT',
            headers: vitest_1.expect.any(Object),
            body: JSON.stringify({ update: true }),
        }));
    });
    (0, vitest_1.it)('should make a DELETE request successfully', async () => {
        // @ts-ignore
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => successResponse,
        });
        const result = await apiService.delete('/test-endpoint');
        (0, vitest_1.expect)(result).toEqual(successResponse);
        (0, vitest_1.expect)(fetch).toHaveBeenCalledWith('https://api.example.com/test-endpoint', vitest_1.expect.objectContaining({
            method: 'DELETE',
            headers: vitest_1.expect.any(Object),
        }));
    });
    (0, vitest_1.it)('should handle DELETE request errors', async () => {
        // @ts-ignore
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
            json: async () => errorResponse,
        });
        await (0, vitest_1.expect)(apiService.delete('/test-endpoint')).rejects.toThrow('Something went wrong');
        (0, vitest_1.expect)(fetch).toHaveBeenCalledWith('https://api.example.com/test-endpoint', vitest_1.expect.objectContaining({
            method: 'DELETE',
            headers: vitest_1.expect.any(Object),
        }));
    });
});
