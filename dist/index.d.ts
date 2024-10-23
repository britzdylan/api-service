interface Options {
    withAuth: boolean;
}
export default class ApiService {
    private baseUrl;
    private token;
    private baseHeaders;
    private options;
    private getHeaders;
    private handleResponse;
    private request;
    constructor(token: string, baseUrl: string);
    get<T>(endpoint: string, options?: Options): Promise<T>;
    post<T>(endpoint: string, data: object, options?: Options): Promise<T>;
    put<T>(endpoint: string, data: object, options?: Options): Promise<T>;
    delete<T>(endpoint: string, options?: Options): Promise<T>;
}
export {};
