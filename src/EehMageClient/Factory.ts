import { AxiosInstance } from 'axios';
import HttpClient from './HttpClient';
import Api from './Api';

export default class Factory {
    static create(apiKey: string, baseUrl: string, http?: AxiosInstance): Api {
        const client = new HttpClient(apiKey, baseUrl, http);
        return new Api(client);
    }
}
