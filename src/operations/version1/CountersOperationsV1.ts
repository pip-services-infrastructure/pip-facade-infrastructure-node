let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node'; 
import { DependencyResolver } from 'pip-services-commons-node';
import { StringConverter } from 'pip-services-commons-node';

import { ICountersClientV1 } from 'pip-clients-counters-node';
import { CounterV1 } from 'pip-clients-counters-node';

import { FacadeOperations } from 'pip-services-facade-node';

export class CountersOperationsV1  extends FacadeOperations {
    private _countersClient: ICountersClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('counters', new Descriptor('pip-services-counters', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._countersClient = this._dependencyResolver.getOneRequired<ICountersClientV1>('counters');
    }

    public getCountersOperation() {
        return (req, res) => {
            this.getCounters(req, res);
        }
    }

    public getCountersAsTextOperation() {
        return (req, res) => {
            this.getCountersAsText(req, res);
        }
    }

    public writeCounterOperation() {
        return (req, res) => {
            this.writeCounter(req, res);
        }
    }

    public clearCountersOperation() {
        return (req, res) => {
            this.clearCounters(req, res);
        }
    }

    private getCounters(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        this._countersClient.readCounters(
            null, filter, paging, this.sendResult(req, res)
        );
    }

    private counterToText(counter: CounterV1): string {
        var output = "Counter " + counter.name + " { ";
        output += "\"type\": " + counter.type;
        if (counter.last != null)
            output += ", \"last\": " + StringConverter.toString(counter.last);
        if (counter.count != null)
            output += ", \"count\": " + StringConverter.toString(counter.count);
        if (counter.min != null)
            output += ", \"min\": " + StringConverter.toString(counter.min);
        if (counter.max != null)
            output += ", \"max\": " + StringConverter.toString(counter.max);
        if (counter.average != null)
            output += ", \"avg\": " + StringConverter.toString(counter.average);
        if (counter.time != null)
            output += ", \"time\": " + StringConverter.toString(counter.time);
        output += " }";
        return output;
    }

    private countersToText(counters: CounterV1[]): string {
        if (counters == null) return null;

        let output = "";
        _.each(counters, (m) => {
            if (output.length > 0) output += "\r\n";
            output += this.counterToText(m);
        });
        return output;    
    }

    private getCountersAsText(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        this._countersClient.readCounters(
            null, filter, paging, (err, page) => {
                if (err != null) this.sendError(req, res, err);
                else res.send(this.countersToText(page.data));
            }
        );
    }

    private writeCounter(req: any, res: any): void {
        let counter = req.body;

        this._countersClient.writeCounter(
            null, counter, this.sendResult(req, res)
        );
    }

    private clearCounters(req: any, res: any): void {
        this._countersClient.clear(
            null, (err) => {
                if (err) this.sendError(req, res, err);
                else res.json(204);
            }
        );
    }

}