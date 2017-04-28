let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node'; 
import { DependencyResolver } from 'pip-services-commons-node';

import { IEventLogClientV1 } from 'pip-clients-eventlog-node';

import { FacadeOperations } from 'pip-services-facade-node';

export class EventLogOperationsV1  extends FacadeOperations {
    private _eventLogClient: IEventLogClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('eventlog', new Descriptor('pip-services-eventlog', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._eventLogClient = this._dependencyResolver.getOneRequired<IEventLogClientV1>('eventlog');
    }

    public getEventsOperation() {
        return (req, res) => {
            this.getEvents(req, res);
        }
    }

    public logEventOperation() {
        return (req, res) => {
            this.logEvent(req, res);
        }
    }

    private getEvents(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        this._eventLogClient.getEvents(
            null, filter, paging, this.sendResult(req, res)
        );
    }

    private logEvent(req: any, res: any): void {
        let event = req.body;

        this._eventLogClient.logEvent(
            null, event, this.sendResult(req, res)
        );
    }

}