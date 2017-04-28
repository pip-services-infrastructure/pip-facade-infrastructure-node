import { IReferences } from 'pip-services-commons-node';
import { FacadeOperations } from 'pip-services-facade-node';
export declare class LoggingOperationsV1 extends FacadeOperations {
    private _loggingClient;
    constructor();
    setReferences(references: IReferences): void;
    getMessagesOperation(): (req: any, res: any) => void;
    getErrorsOperation(): (req: any, res: any) => void;
    writeMessageOperation(): (req: any, res: any) => void;
    clearMessagesOperation(): (req: any, res: any) => void;
    private getMessages(req, res);
    private getErrors(req, res);
    private writeMessage(req, res);
    private clearMessages(req, res);
}
