let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';
import { IntegerConverter } from 'pip-services3-commons-node';
import { DateTimeConverter } from 'pip-services3-commons-node';

import { IStatisticsClientV1 } from 'pip-clients-statistics-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class StatisticsOperationsV1  extends FacadeOperations {
    private _statisticsClient: IStatisticsClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('statistics', new Descriptor('pip-services-statistics', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._statisticsClient = this._dependencyResolver.getOneRequired<IStatisticsClientV1>('statistics');
    }

    public getGroupsOperation() {
        return (req, res) => {
            this.getGroups(req, res);
        }
    }

    public getCountersOperation() {
        return (req, res) => {
            this.getCounters(req, res);
        }
    }

    public readCounterOperation() {
        return (req, res) => {
            this.readCounter(req, res);
        }
    }

    public readCountersByGroupOperation() {
        return (req, res) => {
            this.readCountersByGroup(req, res);
        }
    }

    public readCountersOperation() {
        return (req, res) => {
            this.readCounters(req, res);
        }
    }

    public incrementCounterOperation() {
        return (req, res) => {
            this.incrementCounter(req, res);
        }
    }

    private getGroups(req: any, res: any): void {
        let paging = this.getPagingParams(req);

        this._statisticsClient.getGroups(
            null, paging, this.sendResult(req, res)
        );
    }

    private getCounters(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        this._statisticsClient.getCounters(
            null, filter, paging, this.sendResult(req, res)
        );
    }

    private readCounter(req: any, res: any): void {
        let name = req.param('name');
        let group = req.param('group');
        let type = IntegerConverter.toInteger(req.param('type'));
        let fromTime = DateTimeConverter.toNullableDateTime(req.param('from_time'));
        let toTime = DateTimeConverter.toNullableDateTime(req.param('to_time'));
        let timezone = req.param('timezone');
        
        this._statisticsClient.readOneCounter(
            null, group, name, type, fromTime, toTime, timezone, this.sendResult(req, res)
        );
    }

    private readCountersByGroup(req: any, res: any): void {
        let group = req.param('group');
        let type = IntegerConverter.toInteger(req.param('type'));
        let fromTime = DateTimeConverter.toNullableDateTime(req.param('from_time'));
        let toTime = DateTimeConverter.toNullableDateTime(req.param('to_time'));
        let timezone = req.param('timezone');
        
        this._statisticsClient.readCountersByGroup(
            null, group, type, fromTime, toTime, timezone, this.sendResult(req, res)
        );
    }

    private readCounters(req: any, res: any): void {
        let counters = req.body;
        let type = IntegerConverter.toInteger(req.param('type'));
        let fromTime = DateTimeConverter.toNullableDateTime(req.param('from_time'));
        let toTime = DateTimeConverter.toNullableDateTime(req.param('to_time'));
        let timezone = req.param('timezone');
        
        this._statisticsClient.readCounters(
            null, counters, type, fromTime, toTime, timezone, this.sendResult(req, res)
        );
    }

    private incrementCounter(req: any, res: any): void {
        let group = req.param('group');
        let name = req.param('name');
        let time = req.param('time');
        let timezone = req.param('timezone');
        let value = IntegerConverter.toInteger(req.param('value'));

        this._statisticsClient.incrementCounter(
            null, group, name, time, timezone, value, this.sendEmptyResult(req, res)
        );
    }

}