let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node'; 
import { DependencyResolver } from 'pip-services-commons-node';

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