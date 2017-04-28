import { IReferences } from 'pip-services-commons-node';
import { FacadeOperations } from 'pip-services-facade-node';
export declare class EventLogOperationsV1 extends FacadeOperations {
    private _eventLogClient;
    constructor();
    setReferences(references: IReferences): void;
    getEventsOperation(): (req: any, res: any) => void;
    logEventOperation(): (req: any, res: any) => void;
    private getEvents(req, res);
    private logEvent(req, res);
}
