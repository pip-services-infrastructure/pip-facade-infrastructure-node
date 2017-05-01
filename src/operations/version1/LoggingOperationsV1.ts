let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node'; 
import { DependencyResolver } from 'pip-services-commons-node';
import { LogLevelConverter } from 'pip-services-commons-node';
import { StringConverter } from 'pip-services-commons-node';

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

    public getMessagesAsTextOperation() {
        return (req, res) => {
            this.getMessagesAsText(req, res);
        }
    }

    public getErrorsAsTextOperation() {
        return (req, res) => {
            this.getErrorsAsText(req, res);
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

    private messageToText(message: LogMessageV1): string {
        let output = "["
            + (message.correlation_id || "---")
            + ":"
            + LogLevelConverter.toString(message.level)
            + ":"
            + StringConverter.toString(message.time)
            + "] "
            + message.message;

        if (message.error != null) {
            if (message.message == "")
                output += "Error: ";
            else output += ": ";
        
            output += message.error.type
                + " Code: " + message.error.code
                + " Message: " + message.error.message
                + " StackTrace: " + message.error.stack_trace;
        }

        return output;
    }

    private messagesToText(messages: LogMessageV1[]): string {
        if (messages == null) return null;

        let output = "";
        _.each(messages, (m) => {
            if (output.length > 0) output += "\n";
            output += this.messageToText(m);
        });
        return output;
    }

    private getMessagesAsText(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        this._loggingClient.readMessages(
            null, filter, paging, (err, page) => {
                if (err != null) this.sendError(req, res, err);
                else res.send(this.messagesToText(page.data));
            }
        );
    }

    private getErrorsAsText(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        this._loggingClient.readErrors(
            null, filter, paging, (err, page) => {
                if (err != null) this.sendError(req, res, err);
                else res.send(this.messagesToText(page.data));
            }
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