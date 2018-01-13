"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
let busboy = require('busboy');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_facade_node_1 = require("pip-services-facade-node");
class BlobsOperationsV1 extends pip_services_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('blobs', new pip_services_commons_node_1.Descriptor('pip-services-blobs', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._blobsClient = this._dependencyResolver.getOneRequired('blobs');
    }
    getBlobsOperation() {
        return (req, res) => {
            this.getBlobs(req, res);
        };
    }
    getBlobInfoOperation() {
        return (req, res) => {
            this.getBlobInfo(req, res);
        };
    }
    getBlobOperation() {
        return (req, res) => {
            this.getBlob(req, res);
        };
    }
    setBlobOperation() {
        return (req, res) => {
            this.setBlob(req, res);
        };
    }
    loadBlobFromUrlOperation() {
        return (req, res) => {
            this.loadBlobFromUrl(req, res);
        };
    }
    updateBlobInfoOperation() {
        return (req, res) => {
            this.updateBlobInfo(req, res);
        };
    }
    deleteBlobOperation() {
        return (req, res) => {
            this.deleteBlob(req, res);
        };
    }
    getBlobs(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        this._blobsClient.getBlobsByFilter(null, filter, paging, this.sendResult(req, res));
    }
    getBlobInfo(req, res) {
        let blobId = req.param("id") || req.param("blob_id");
        this._blobsClient.getBlobById(null, blobId, this.sendResult(req, res));
    }
    getBlob(req, res) {
        let blobId = req.param("id") || req.param("blob_id");
        let blob;
        let uri = null;
        async.series([
            (callback) => {
                // Get blob id
                this._blobsClient.getBlobById(null, blobId, (err, data) => {
                    if (err == null && data == null) {
                        err = new pip_services_commons_node_2.NotFoundException(null, 'BLOB_NOT_FOUND', 'Blob ' + blobId + ' was not found').withDetails('blob_id', blobId);
                    }
                    blob = data;
                    callback(err);
                });
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
                if (uri)
                    callback();
                else {
                    let rs = this._blobsClient.getBlobStreamById(null, blobId, callback);
                    res.header('Content-Type', blob.content_type);
                    res.header('Content-Length', blob.size);
                    res.header('Content-Disposition', 'inline; filename=' + (blob.name || blob.id));
                    rs.pipe(res);
                }
            }
        ], (err) => {
            if (err)
                this.sendError(req, res, err);
        });
    }
    setBlob(req, res) {
        let blobId = req.param("id") || req.param("blob_id");
        let group = req.param('group');
        let expireTime = pip_services_commons_node_4.DateTimeConverter.toNullableDateTime(req.param('expire_time'));
        let completed = pip_services_commons_node_3.BooleanConverter.toBoolean(req.param('completed'));
        let blob;
        let form = new busboy({ headers: req.headers });
        form.on('file', (field, rs, name, encoding, contentType) => {
            blob = {
                id: blobId,
                group: group,
                name: name,
                content_type: contentType,
                size: null,
                expire_time: expireTime,
                completed: completed
            };
            let ws = this._blobsClient.createBlobFromStream(null, blob, (err, blob) => {
                if (err)
                    this.sendError(req, res, err);
                else
                    res.json(blob);
            });
            rs.pipe(ws);
        });
        form.on('finish', () => {
            //res.json(blob);
        });
        req.pipe(form);
    }
    loadBlobFromUrl(req, res) {
        let blobId = req.param("id") || req.param("blob_id");
        let group = req.param('group');
        let url = req.param('url') || req.param('uri');
        let name = req.param('name');
        let expireTime = pip_services_commons_node_4.DateTimeConverter.toNullableDateTime(req.param('expire_time'));
        let completed = pip_services_commons_node_3.BooleanConverter.toBoolean(req.param('completed'));
        if (name == null || name == '') {
            let path = new URL(url).pathname || '';
            let pos = path.lastIndexOf('/');
            if (pos > 0)
                name = path.substring(pos + 1);
        }
        let blob = {
            id: blobId,
            group: group,
            name: name,
            content_type: null,
            size: null,
            create_time: new Date(),
            expire_time: expireTime,
            completed: completed
        };
        this._blobsClient.createBlobFromUri(null, blob, url, (err, blob) => {
            if (err)
                this.sendError(req, res, err);
            else
                res.json(blob);
        });
    }
    updateBlobInfo(req, res) {
        let blobId = req.param("id") || req.param("blob_id");
        let blob = req.body || {};
        blob.id = blobId;
        this._blobsClient.updateBlobInfo(null, blob, this.sendResult(req, res));
    }
    deleteBlob(req, res) {
        let blobId = req.param("id") || req.param("blob_id");
        this._blobsClient.deleteBlobById(null, blobId, this.sendEmptyResult(req, res));
    }
}
exports.BlobsOperationsV1 = BlobsOperationsV1;
//# sourceMappingURL=BlobsOperationsV1.js.map