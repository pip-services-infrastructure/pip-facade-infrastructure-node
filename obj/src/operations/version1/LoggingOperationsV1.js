"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_facade_node_1 = require("pip-services-facade-node");
class LoggingOperationsV1 extends pip_services_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('logging', new pip_services_commons_node_1.Descriptor('pip-services-logging', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._loggingClient = this._dependencyResolver.getOneRequired('logging');
    }
    getMessagesOperation() {
        return (req, res) => {
            this.getMessages(req, res);
        };
    }
    getErrorsOperation() {
        return (req, res) => {
            this.getErrors(req, res);
        };
    }
    writeMessageOperation() {
        return (req, res) => {
            this.writeMessage(req, res);
        };
    }
    clearMessagesOperation() {
        return (req, res) => {
            this.clearMessages(req, res);
        };
    }
    getMessages(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        this._loggingClient.readMessages(null, filter, paging, this.sendResult(req, res));
    }
    getErrors(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        this._loggingClient.readErrors(null, filter, paging, this.sendResult(req, res));
    }
    writeMessage(req, res) {
        let message = req.body;
        this._loggingClient.writeMessage(null, message, this.sendResult(req, res));
    }
    clearMessages(req, res) {
        this._loggingClient.clear(null, (err) => {
            if (err)
                this.sendError(req, res, err);
            else
                res.json(204);
        });
    }
}
exports.LoggingOperationsV1 = LoggingOperationsV1;
//# sourceMappingURL=LoggingOperationsV1.js.map