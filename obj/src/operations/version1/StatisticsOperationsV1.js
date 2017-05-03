"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_facade_node_1 = require("pip-services-facade-node");
class StatisticsOperationsV1 extends pip_services_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('statistics', new pip_services_commons_node_1.Descriptor('pip-services-statistics', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._statisticsClient = this._dependencyResolver.getOneRequired('statistics');
    }
    getGroupsOperation() {
        return (req, res) => {
            this.getGroups(req, res);
        };
    }
    getCountersOperation() {
        return (req, res) => {
            this.getCounters(req, res);
        };
    }
    readCounterOperation() {
        return (req, res) => {
            this.readCounter(req, res);
        };
    }
    readCountersByGroupOperation() {
        return (req, res) => {
            this.readCountersByGroup(req, res);
        };
    }
    readCountersOperation() {
        return (req, res) => {
            this.readCounters(req, res);
        };
    }
    incrementCounterOperation() {
        return (req, res) => {
            this.incrementCounter(req, res);
        };
    }
    getGroups(req, res) {
        let paging = this.getPagingParams(req);
        this._statisticsClient.getGroups(null, paging, this.sendResult(req, res));
    }
    getCounters(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        this._statisticsClient.getCounters(null, filter, paging, this.sendResult(req, res));
    }
    readCounter(req, res) {
        let name = req.param('name');
        let group = req.param('group');
        let type = pip_services_commons_node_2.IntegerConverter.toInteger(req.param('type'));
        let fromTime = pip_services_commons_node_3.DateTimeConverter.toNullableDateTime(req.param('from_time'));
        let toTime = pip_services_commons_node_3.DateTimeConverter.toNullableDateTime(req.param('to_time'));
        this._statisticsClient.readOneCounter(null, group, name, type, fromTime, toTime, this.sendResult(req, res));
    }
    readCountersByGroup(req, res) {
        let group = req.param('group');
        let type = pip_services_commons_node_2.IntegerConverter.toInteger(req.param('type'));
        let fromTime = pip_services_commons_node_3.DateTimeConverter.toNullableDateTime(req.param('from_time'));
        let toTime = pip_services_commons_node_3.DateTimeConverter.toNullableDateTime(req.param('to_time'));
        this._statisticsClient.readCountersByGroup(null, group, type, fromTime, toTime, this.sendResult(req, res));
    }
    readCounters(req, res) {
        let counters = req.body;
        let type = pip_services_commons_node_2.IntegerConverter.toInteger(req.param('type'));
        let fromTime = pip_services_commons_node_3.DateTimeConverter.toNullableDateTime(req.param('from_time'));
        let toTime = pip_services_commons_node_3.DateTimeConverter.toNullableDateTime(req.param('to_time'));
        this._statisticsClient.readCounters(null, counters, type, fromTime, toTime, this.sendResult(req, res));
    }
    incrementCounter(req, res) {
        let group = req.param('group');
        let name = req.param('name');
        let value = pip_services_commons_node_2.IntegerConverter.toInteger(req.param('value'));
        this._statisticsClient.incrementCounter(null, group, name, value, this.sendEmptyResult(req, res));
    }
}
exports.StatisticsOperationsV1 = StatisticsOperationsV1;
//# sourceMappingURL=StatisticsOperationsV1.js.map