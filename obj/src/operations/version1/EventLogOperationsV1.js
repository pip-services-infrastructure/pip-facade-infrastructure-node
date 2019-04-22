"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class EventLogOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('eventlog', new pip_services3_commons_node_1.Descriptor('pip-services-eventlog', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._eventLogClient = this._dependencyResolver.getOneRequired('eventlog');
    }
    getEventsOperation() {
        return (req, res) => {
            this.getEvents(req, res);
        };
    }
    logEventOperation() {
        return (req, res) => {
            this.logEvent(req, res);
        };
    }
    getEvents(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        this._eventLogClient.getEvents(null, filter, paging, this.sendResult(req, res));
    }
    logEvent(req, res) {
        let event = req.body;
        this._eventLogClient.logEvent(null, event, this.sendResult(req, res));
    }
}
exports.EventLogOperationsV1 = EventLogOperationsV1;
//# sourceMappingURL=EventLogOperationsV1.js.map