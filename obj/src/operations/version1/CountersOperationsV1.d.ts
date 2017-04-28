import { IReferences } from 'pip-services-commons-node';
import { FacadeOperations } from 'pip-services-facade-node';
export declare class CountersOperationsV1 extends FacadeOperations {
    private _countersClient;
    constructor();
    setReferences(references: IReferences): void;
    getCountersOperation(): (req: any, res: any) => void;
    writeCounterOperation(): (req: any, res: any) => void;
    clearCountersOperation(): (req: any, res: any) => void;
    private getCounters(req, res);
    private writeCounter(req, res);
    private clearCounters(req, res);
}
