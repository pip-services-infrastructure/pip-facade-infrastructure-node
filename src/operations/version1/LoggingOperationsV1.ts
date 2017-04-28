let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node'; 
import { DependencyResolver } from 'pip-services-commons-node';

import { ILoggingClientV1 } from 'pip-clients-logging-node';
import { LogMessageV1 } from 'pip-clients-logging-node';

import { FacadeOperations } from 'pip-services-facade-node';

export class LoggingOperationsV1  extends FacadeOperations {
    private _loggingClient: ILoggingClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('logging', new Descriptor('pip-services-logging', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._loggingClient = this._dependencyResolver.getOneRequired<ILoggingClientV1>('logging');
    }

    public getMessagesOperation() {
        return (req, res) => {
            this.getMessages(req, res);
        }
    }

    public getErrorsOperation() {
        return (req, res) => {
            this.getErrors(req, res);
        }
    }

    public writeMessageOperation() {
        return (req, res) => {
            this.writeMessage(req, res);
        }
    }

    public clearMessagesOperation() {
        return (req, res) => {
            this.clearMessages(req, res);
        }
    }

    private getMessages(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        this._loggingClient.readMessages(
            null, filter, paging, this.sendResult(req, res)
        );
    }

    private getErrors(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        this._loggingClient.readErrors(
            null, filter, paging, this.sendResult(req, res)
        );
    }

    private writeMessage(req: any, res: any): void {
        let message = req.body;

        this._loggingClient.writeMessage(
            null, message, this.sendResult(req, res)
        );
    }

    private clearMessages(req: any, res: any): void {
        this._loggingClient.clear(
            null, (err) => {
                if (err) this.sendError(req, res, err);
                else res.json(204);
            }
        );
    }

}