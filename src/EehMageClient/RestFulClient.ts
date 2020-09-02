import HttpClient from './HttpClient';

export default class RestFulClient<T, U> {
    client: HttpClient;
    baseUri: string;

    constructor(client: HttpClient, baseUri: string) {
        this.client = client;
        this.baseUri = baseUri;
    }

    public list(): Promise<T[]> {
        return this.client.request('GET', this.baseUri);
    }

    public view(id: string): Promise<T> {
        return this.client.request('GET', this.baseUri + '/' + id);
    }

    public create(data: U): Promise<T> {
        return (this.client.request('POST', this.baseUri, data) as unknown) as Promise<T>;
    }

    public update(id: string, data: Partial<U>): Promise<T> {
        return (this.client.request('PATCH', this.baseUri + '/' + id, data) as unknown) as Promise<T>;
    }
}
