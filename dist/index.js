"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "GET";
    HttpMethod["POST"] = "POST";
    HttpMethod["PUT"] = "PUT";
    HttpMethod["DELETE"] = "DELETE";
})(HttpMethod || (HttpMethod = {}));
class ApiService {
    baseUrl = '';
    token = '';
    baseHeaders = {
        'Content-Type': 'application/json',
    };
    options = {
        withAuth: true,
    };
    getHeaders(withAuth) {
        const headers = { ...this.baseHeaders };
        if (withAuth) {
            headers.Authorization = `Bearer ${this.token}`;
        }
        return headers;
    }
    // Helper function to handle HTTP responses
    async handleResponse(response) {
        if (!response.ok) {
            const error = await response.json();
            const message = error.errors?.[0]?.message ||
                error.message ||
                'Oops, something went wrong';
            if (response.status >= 500) {
                console.error(error);
            }
            throw new Error(message);
        }
        return response.json();
    }
    // Generic request method
    async request(method, endpoint, data, options = this.options) {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method,
            headers: this.getHeaders(options.withAuth),
            body: data ? JSON.stringify(data) : undefined,
        });
        return this.handleResponse(response);
    }
    constructor(token, baseUrl) {
        this.token = token;
        this.baseUrl = baseUrl;
    }
    // GET request
    async get(endpoint, options = this.options) {
        return this.request(HttpMethod.GET, endpoint, undefined, options);
    }
    // POST request
    async post(endpoint, data, options = this.options) {
        return this.request(HttpMethod.POST, endpoint, data, options);
    }
    // PUT request
    async put(endpoint, data, options = this.options) {
        return this.request(HttpMethod.PUT, endpoint, data, options);
    }
    // DELETE request
    async delete(endpoint, options = this.options) {
        return this.request(HttpMethod.DELETE, endpoint, undefined, options);
    }
}
exports.default = ApiService;
