import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class SmsOperationsV1 extends FacadeOperations {
    private _smsClient;
    constructor();
    setReferences(references: IReferences): void;
    sendMessageOperation(): (req: any, res: any) => void;
    private sendMessage(req, res);
}
