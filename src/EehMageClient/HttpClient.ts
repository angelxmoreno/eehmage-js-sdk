import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ResponseError } from './types';

export default class HttpClient {
    protected apiKey: string;
    protected baseUrl: string;
    protected http: AxiosInstance;

    constructor(apiKey: string, baseUrl: string, http?: AxiosInstance) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
        this.http = http || axios.create();
    }

    static errorFromResponseError(responseError: ResponseError): Error {
        const error = new Error(responseError.error.description);
        error.name = responseError.error.type;
        return Object.assign(error, {
            statusCode: responseError.statusCode,
            messages: responseError.error.messages,
        });
    }

    public async request<T>(method: 'GET' | 'POST' | 'PATCH', url: string, payload?: Partial<T>): Promise<T> {
        const config: AxiosRequestConfig = {
            method,
            url,
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.apiKey}`,
            },
            validateStatus: (status: number) => status > 199,
        };

        if (method !== 'GET' && payload) {
            config.data = payload;
        }
        const { data } = await this.http.request(config);
        if (data.statusCode) {
            throw HttpClient.errorFromResponseError(data);
        }
        return data;
    }
}
