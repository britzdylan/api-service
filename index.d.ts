// index.d.ts

export interface Options {
  withAuth: boolean;
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export default class ApiService {
  constructor(token: string, baseUrl: string);

  /**
   * Makes a GET request to the specified endpoint.
   * @param endpoint - The endpoint to make the GET request to.
   * @param options - Options for the request, defaults to { withAuth: true }.
   * @returns A promise that resolves with the response data.
   */
  get<T>(endpoint: string, options?: Options): Promise<T>;

  /**
   * Makes a POST request to the specified endpoint with the given data.
   * @param endpoint - The endpoint to make the POST request to.
   * @param data - The data to send with the POST request.
   * @param options - Options for the request, defaults to { withAuth: true }.
   * @returns A promise that resolves with the response data.
   */
  post<T>(endpoint: string, data: object, options?: Options): Promise<T>;

  /**
   * Makes a PUT request to the specified endpoint with the given data.
   * @param endpoint - The endpoint to make the PUT request to.
   * @param data - The data to send with the PUT request.
   * @param options - Options for the request, defaults to { withAuth: true }.
   * @returns A promise that resolves with the response data.
   */
  put<T>(endpoint: string, data: object, options?: Options): Promise<T>;

  /**
   * Makes a DELETE request to the specified endpoint.
   * @param endpoint - The endpoint to make the DELETE request to.
   * @param options - Options for the request, defaults to { withAuth: true }.
   * @returns A promise that resolves with the response data.
   */
  delete<T>(endpoint: string, options?: Options): Promise<T>;
}
