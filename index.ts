interface Options {
  withAuth: boolean;
}

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export default class ApiService {
  private baseUrl: string = '';
  private token: string = '';

  private baseHeaders = {
    'Content-Type': 'application/json',
  };
  private options: Options = {
    withAuth: true,
  };

  private getHeaders(withAuth: boolean) {
    const headers: { [key: string]: any } = { ...this.baseHeaders };
    if (withAuth) {
      headers.Authorization = `Bearer ${this.token}`;
    }
    return headers;
  }

  // Helper function to handle HTTP responses
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json();
      const message =
        error.errors?.[0]?.message ||
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
  private async request<T>(
    method: HttpMethod,
    endpoint: string,
    data?: object,
    options: Options = this.options
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: this.getHeaders(options.withAuth),
      body: data ? JSON.stringify(data) : undefined,
    });
    return this.handleResponse(response);
  }

  constructor(token: string, baseUrl: string) {
    this.token = token;
    this.baseUrl = baseUrl;
  }

  // GET request
  async get<T>(endpoint: string, options: Options = this.options): Promise<T> {
    return this.request<T>(HttpMethod.GET, endpoint, undefined, options);
  }

  // POST request
  async post<T>(
    endpoint: string,
    data: object,
    options: Options = this.options
  ): Promise<T> {
    return this.request<T>(HttpMethod.POST, endpoint, data, options);
  }

  // PUT request
  async put<T>(
    endpoint: string,
    data: object,
    options: Options = this.options
  ): Promise<T> {
    return this.request<T>(HttpMethod.PUT, endpoint, data, options);
  }

  // DELETE request
  async delete<T>(
    endpoint: string,
    options: Options = this.options
  ): Promise<T> {
    return this.request<T>(HttpMethod.DELETE, endpoint, undefined, options);
  }
}
