let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node'; 
import { DependencyResolver } from 'pip-services-commons-node';
import { IntegerConverter } from 'pip-services-commons-node';
import { DateTimeConverter } from 'pip-services-commons-node';

import { IStatisticsClientV1 } from 'pip-clients-statistics-node';

import { FacadeOperations } from 'pip-services-facade-node';

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
        let name = req.route.params.name;
        let group = req.route.params.group;
        let type = IntegerConverter.toInteger(req.param('type'));
        let fromTime = DateTimeConverter.toNullableDateTime(req.param('from_time'));
        let toTime = DateTimeConverter.toNullableDateTime(req.param('to_time'));

        this._statisticsClient.readOneCounter(
            null, group, name, type, fromTime, toTime, this.sendResult(req, res)
        );
    }

    private readCounters(req: any, res: any): void {
        let counters = req.body;
        let type = IntegerConverter.toInteger(req.param('type'));
        let fromTime = DateTimeConverter.toNullableDateTime(req.param('from_time'));
        let toTime = DateTimeConverter.toNullableDateTime(req.param('to_time'));

        this._statisticsClient.readCounters(
            null, counters, type, fromTime, toTime, this.sendResult(req, res)
        );
    }

    private incrementCounter(req: any, res: any): void {
        let group = req.param('group');
        let name = req.param('name');
        let value = IntegerConverter.toInteger(req.param('value'));

        this._statisticsClient.incrementCounter(
            null, group, name, value, this.sendEmptyResult(req, res)
        );
    }

}