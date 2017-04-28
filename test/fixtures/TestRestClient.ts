let restify = require('restify');

export class TestRestClient {
    private _rest: any;

    public constructor() {
        let url = 'http://localhost:3000';
        this._rest = restify.createJsonClient({ url: url, version: '*' });
    }

    public get(path: string,
        callback: (err: any, req: any, res: any, result: any) => void): void {
        delete this._rest.headers['x-session-id'];
        this._rest.get(path, callback);
    }

    public head(path: string,
        callback: (err: any, req: any, res: any, result: any) => void): void {
        delete this._rest.headers['x-session-id'];
        this._rest.head(path, callback)
    }

    public post(path: string, params: any,
        callback: (err: any, req: any, res: any, result: any) => void): void {
        delete this._rest.headers['x-session-id'];
        this._rest.post(path, params, callback);
    }

    public put(path: string, params: any,
        callback: (err: any, req: any, res: any, result: any) => void): void {
        delete this._rest.headers['x-session-id'];
        this._rest.put(path, params, callback);
    }

    public del(path: string,
        callback: (err: any, req: any, res: any, result: any) => void): void {
        delete this._rest.headers['x-session-id'];
        this._rest.del(path, callback);
    }

}