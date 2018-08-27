"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_components_node_1 = require("pip-services-components-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
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
    getMessagesAsTextOperation() {
        return (req, res) => {
            this.getMessagesAsText(req, res);
        };
    }
    getErrorsAsTextOperation() {
        return (req, res) => {
            this.getErrorsAsText(req, res);
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
    messageToText(message) {
        let output = "["
            + (message.correlation_id || "---")
            + ":"
            + pip_services_components_node_1.LogLevelConverter.toString(message.level)
            + ":"
            + pip_services_commons_node_2.StringConverter.toString(message.time)
            + "] "
            + message.message;
        if (message.error != null) {
            if (message.message == "")
                output += "Error: ";
            else
                output += ": ";
            output += message.error.type
                + " Code: " + message.error.code
                + " Message: " + message.error.message
                + " StackTrace: " + message.error.stack_trace;
        }
        return output;
    }
    messagesToText(messages) {
        if (messages == null)
            return null;
        let output = "";
        _.each(messages, (m) => {
            if (output.length > 0)
                output += "\r\n";
            output += this.messageToText(m);
        });
        return output;
    }
    getMessagesAsText(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        this._loggingClient.readMessages(null, filter, paging, (err, page) => {
            if (err != null)
                this.sendError(req, res, err);
            else
                res.send(this.messagesToText(page.data));
        });
    }
    getErrorsAsText(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        this._loggingClient.readErrors(null, filter, paging, (err, page) => {
            if (err != null)
                this.sendError(req, res, err);
            else
                res.send(this.messagesToText(page.data));
        });
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