import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class LoggingOperationsV1 extends FacadeOperations {
    private _loggingClient;
    constructor();
    setReferences(references: IReferences): void;
    getMessagesOperation(): (req: any, res: any) => void;
    getErrorsOperation(): (req: any, res: any) => void;
    getMessagesAsTextOperation(): (req: any, res: any) => void;
    getErrorsAsTextOperation(): (req: any, res: any) => void;
    writeMessageOperation(): (req: any, res: any) => void;
    clearMessagesOperation(): (req: any, res: any) => void;
    private getMessages(req, res);
    private getErrors(req, res);
    private messageToText(message);
    private messagesToText(messages);
    private getMessagesAsText(req, res);
    private getErrorsAsText(req, res);
    private writeMessage(req, res);
    private clearMessages(req, res);
}
