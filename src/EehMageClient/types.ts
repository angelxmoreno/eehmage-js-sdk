export type ResponseUnknown = Record<string, unknown>[];
export type ResponseHealthCheck = { status: string; auth: boolean };
export type ResponseError = {
    statusCode: number;
    error: {
        type: string;
        description: string;
        messages?: Record<string, string[]>;
    };
};
export type GroupEntity = {
    id: string;
    is_active: boolean;
    name: string;
    dir: string;
    created: Date;
    modified: Date;
    deleted?: Date;
};
export type GroupRequest = {
    is_active?: boolean;
    name: string;
};
export type ImageEntity = {
    id: string;
    is_active: boolean;
    name: string;
    original_name: string;
    path: string;
    size: number;
    type: string;
    width: number;
    height: number;
    mime: string;
    created: Date;
    modified: Date;
    deleted?: Date;
    url: string;
    group_id: string;
    group: GroupEntity;
};
export type ImageRequest = {
    is_active?: boolean;
    group_id: string;
    imgUrl?: string;
    imgString?: string;
    imgFile?: File;
};
