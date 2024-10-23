import { describe, it, expect, vi, beforeEach } from 'vitest';
import ApiService from '../index'; // Adjust the import according to your file structure

// Mocking the fetch function
globalThis.fetch = vi.fn();

// Sample success response
const successResponse = { data: 'Success data' };

// Sample error response
const errorResponse = {
  errors: [{ message: 'Something went wrong' }],
};

describe('ApiService', () => {
  let apiService: ApiService;

  beforeEach(() => {
    // Initialize before each test
    apiService = new ApiService('test-token', 'https://api.example.com');
    vi.clearAllMocks();
  });

  it('should make a GET request successfully', async () => {
    // @ts-ignore
    fetch.mockResolvedValue({
      ok: true,
      json: async () => successResponse,
    });

    const result = await apiService.get('/test-endpoint');

    expect(result).toEqual(successResponse);
    expect(fetch).toHaveBeenCalledWith(
      'https://api.example.com/test-endpoint',
      expect.objectContaining({
        method: 'GET',
        headers: expect.any(Object),
      })
    );
  });

  it('should handle GET request errors', async () => {
    // @ts-ignore
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => errorResponse,
    });

    await expect(apiService.get('/test-endpoint')).rejects.toThrow(
      'Something went wrong'
    );
    expect(fetch).toHaveBeenCalledWith(
      'https://api.example.com/test-endpoint',
      expect.objectContaining({
        method: 'GET',
        headers: expect.any(Object),
      })
    );
  });

  it('should make a POST request successfully', async () => {
    // @ts-ignore

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => successResponse,
    });

    const result = await apiService.post('/test-endpoint', { test: true });

    expect(result).toEqual(successResponse);
    expect(fetch).toHaveBeenCalledWith(
      'https://api.example.com/test-endpoint',
      expect.objectContaining({
        method: 'POST',
        headers: expect.any(Object),
        body: JSON.stringify({ test: true }),
      })
    );
  });

  it('should handle POST request errors', async () => {
    // @ts-ignore

    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => errorResponse,
    });

    await expect(
      apiService.post('/test-endpoint', { test: true })
    ).rejects.toThrow('Something went wrong');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.example.com/test-endpoint',
      expect.objectContaining({
        method: 'POST',
        headers: expect.any(Object),
        body: JSON.stringify({ test: true }),
      })
    );
  });

  // Similar tests can be added for PUT and DELETE

  it('should make a PUT request successfully', async () => {
    // @ts-ignore
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => successResponse,
    });

    const result = await apiService.put('/test-endpoint', { update: true });

    expect(result).toEqual(successResponse);
    expect(fetch).toHaveBeenCalledWith(
      'https://api.example.com/test-endpoint',
      expect.objectContaining({
        method: 'PUT',
        headers: expect.any(Object),
        body: JSON.stringify({ update: true }),
      })
    );
  });

  it('should handle PUT request errors', async () => {
    // @ts-ignore
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => errorResponse,
    });

    await expect(
      apiService.put('/test-endpoint', { update: true })
    ).rejects.toThrow('Something went wrong');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.example.com/test-endpoint',
      expect.objectContaining({
        method: 'PUT',
        headers: expect.any(Object),
        body: JSON.stringify({ update: true }),
      })
    );
  });

  it('should make a DELETE request successfully', async () => {
    // @ts-ignore

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => successResponse,
    });

    const result = await apiService.delete('/test-endpoint');

    expect(result).toEqual(successResponse);
    expect(fetch).toHaveBeenCalledWith(
      'https://api.example.com/test-endpoint',
      expect.objectContaining({
        method: 'DELETE',
        headers: expect.any(Object),
      })
    );
  });

  it('should handle DELETE request errors', async () => {
    // @ts-ignore

    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => errorResponse,
    });

    await expect(apiService.delete('/test-endpoint')).rejects.toThrow(
      'Something went wrong'
    );
    expect(fetch).toHaveBeenCalledWith(
      'https://api.example.com/test-endpoint',
      expect.objectContaining({
        method: 'DELETE',
        headers: expect.any(Object),
      })
    );
  });
});
