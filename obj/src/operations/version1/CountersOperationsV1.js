"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_facade_node_1 = require("pip-services-facade-node");
class CountersOperationsV1 extends pip_services_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('counters', new pip_services_commons_node_1.Descriptor('pip-services-counters', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._countersClient = this._dependencyResolver.getOneRequired('counters');
    }
    getCountersOperation() {
        return (req, res) => {
            this.getCounters(req, res);
        };
    }
    writeCounterOperation() {
        return (req, res) => {
            this.writeCounter(req, res);
        };
    }
    clearCountersOperation() {
        return (req, res) => {
            this.clearCounters(req, res);
        };
    }
    getCounters(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        this._countersClient.readCounters(null, filter, paging, this.sendResult(req, res));
    }
    writeCounter(req, res) {
        let counter = req.body;
        this._countersClient.writeCounter(null, counter, this.sendResult(req, res));
    }
    clearCounters(req, res) {
        this._countersClient.clear(null, (err) => {
            if (err)
                this.sendError(req, res, err);
            else
                res.json(204);
        });
    }
}
exports.CountersOperationsV1 = CountersOperationsV1;
//# sourceMappingURL=CountersOperationsV1.js.map