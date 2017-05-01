"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
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
    getCountersAsTextOperation() {
        return (req, res) => {
            this.getCountersAsText(req, res);
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
    counterToText(counter) {
        var output = "Counter " + counter.name + " { ";
        output += "\"type\": " + counter.type;
        if (counter.last != null)
            output += ", \"last\": " + pip_services_commons_node_2.StringConverter.toString(counter.last);
        if (counter.count != null)
            output += ", \"count\": " + pip_services_commons_node_2.StringConverter.toString(counter.count);
        if (counter.min != null)
            output += ", \"min\": " + pip_services_commons_node_2.StringConverter.toString(counter.min);
        if (counter.max != null)
            output += ", \"max\": " + pip_services_commons_node_2.StringConverter.toString(counter.max);
        if (counter.average != null)
            output += ", \"avg\": " + pip_services_commons_node_2.StringConverter.toString(counter.average);
        if (counter.time != null)
            output += ", \"time\": " + pip_services_commons_node_2.StringConverter.toString(counter.time);
        output += " }";
        return output;
    }
    countersToText(counters) {
        if (counters == null)
            return null;
        let output = "";
        _.each(counters, (m) => {
            if (output.length > 0)
                output += "\r\n";
            output += this.counterToText(m);
        });
        return output;
    }
    getCountersAsText(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        this._countersClient.readCounters(null, filter, paging, (err, page) => {
            if (err != null)
                this.sendError(req, res, err);
            else
                res.send(this.countersToText(page.data));
        });
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