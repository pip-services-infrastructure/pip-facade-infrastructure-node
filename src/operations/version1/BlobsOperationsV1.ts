let _ = require('lodash');
let async = require('async');
let busboy = require('busboy');

import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node'; 
import { DependencyResolver } from 'pip-services-commons-node';
import { NotFoundException } from 'pip-services-commons-node';
import { BooleanConverter } from 'pip-services-commons-node';
import { DateTimeConverter } from 'pip-services-commons-node';

import { IBlobsClientV1 } from 'pip-clients-blobs-node';
import { BlobInfoV1 } from 'pip-clients-blobs-node';

import { FacadeOperations } from 'pip-services-facade-node';

export class BlobsOperationsV1  extends FacadeOperations {
    private _blobsClient: IBlobsClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('blobs', new Descriptor('pip-services-blobs', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._blobsClient = this._dependencyResolver.getOneRequired<IBlobsClientV1>('blobs');
    }

    public getBlobsOperation() {
        return (req, res) => {
            this.getBlobs(req, res);
        }
    }

    public getBlobInfoOperation() {
        return (req, res) => {
            this.getBlobInfo(req, res);
        }
    }

    public getBlobOperation() {
        return (req, res) => {
            this.getBlob(req, res);
        }
    }

    public setBlobOperation() {
        return (req, res) => {
            this.setBlob(req, res);
        }
    }

    public updateBlobInfoOperation() {
        return (req, res) => {
            this.updateBlobInfo(req, res);
        }
    }

    public deleteBlobOperation() {
        return (req, res) => {
            this.deleteBlob(req, res);
        }
    }

    private getBlobs(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        this._blobsClient.getBlobsByFilter(
            null, filter, paging, this.sendResult(req, res)
        );
    }

    private getBlobInfo(req: any, res: any): void {
        let blobId = req.param("id") || req.param("blob_id");

        this._blobsClient.getBlobById(
            null, blobId, this.sendResult(req, res)
        );
    }

    private getBlob(req: any, res: any): void {
        let blobId = req.param("id") || req.param("blob_id");
        let blob: BlobInfoV1;
        let uri: string = null;

        async.series([
            (callback) => {
                // Get blob id
                this._blobsClient.getBlobById(null, blobId, (err, data) => {
                    if (err == null && data == null) {
                        err = new NotFoundException(
                            null,
                            'BLOB_NOT_FOUND',
                            'Blob ' + blobId + ' was not found'
                        ).withDetails('blob_id', blobId);
                    }
                    blob = data;
                    callback(err);
                })
            },
            (callback) => {
                // Redirect to URI if it exist
                this._blobsClient.getBlobUriById(null, blobId, (err, data) => {
                    uri = data;
                    if (uri) {
                        res.writeHead(302, { 'Location': uri });
                        res.end();
                    }
                    callback();
                });
            },
            (callback) => {
                // If URI is not avalable then stream blob directly
                if (uri) callback();
                else {
                    let rs = this._blobsClient.getBlobStreamById(null, blobId, callback);
                    res.header('Content-Type', blob.content_type);
                    res.header('Content-Length', blob.size);
                    res.header('Content-Disposition', 'inline; filename=' + (blob.name || blob.id));
                    rs.pipe(res);
                }
            }
        ], (err) => {
            if (err) this.sendError(req, res, err);
        });
    }

    private setBlob(req: any, res: any): void {
        let blobId = req.param("id") || req.param("blob_id");
        let group = req.param('group');
        let expireTime = DateTimeConverter.toNullableDateTime(req.param('expire_time'));
        let completed = BooleanConverter.toBoolean(req.param('completed'));
        let blob: BlobInfoV1;

        let form = new busboy({ headers: req.headers });
        form.on('file', (field, rs, name, encoding, contentType) => {
            blob = <BlobInfoV1>{
                id: blobId,
                group: group,
                name: name,
                content_type: contentType,
                size: null,
                expire_time: expireTime,
                completed: completed
            };

            let ws = this._blobsClient.createBlobFromStream(null, blob, (err, blob) => {
                if (err) this.sendError(req, res, err);
                else res.json(blob);
            });
            rs.pipe(ws);
        });
        form.on('finish', () => {
            //res.json(blob);
        })
        req.pipe(form);
    }

    private updateBlobInfo(req: any, res: any): void {
        let blobId = req.param("id") || req.param("blob_id");
        let blob = req.body || {};
        blob.id = blobId;

        this._blobsClient.updateBlobInfo(
            null, blob, this.sendResult(req, res)
        );
    }

    private deleteBlob(req: any, res: any): void {
        let blobId = req.param("id") || req.param("blob_id");

        this._blobsClient.deleteBlobById(
            null, blobId, this.sendResult(req, res)
        );
    }

}