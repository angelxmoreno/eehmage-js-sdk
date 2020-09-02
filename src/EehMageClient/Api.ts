import HttpClient from './HttpClient';
import { GroupEntity, GroupRequest, ImageEntity, ImageRequest, ResponseHealthCheck } from './types';
import RestFulClient from './RestFulClient';

export default class Api {
    client: HttpClient;
    group: RestFulClient<GroupEntity, GroupRequest>;
    image: RestFulClient<ImageEntity, ImageRequest>;

    constructor(client: HttpClient) {
        this.client = client;
        this.group = new RestFulClient<GroupEntity, GroupRequest>(client, '/groups');
        this.image = new RestFulClient<ImageEntity, ImageRequest>(client, '/images');
    }

    public healthCheck(): Promise<ResponseHealthCheck> {
        return this.client.request<ResponseHealthCheck>('GET', '/');
    }
}
