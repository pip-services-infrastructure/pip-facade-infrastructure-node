import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class CountersOperationsV1 extends FacadeOperations {
    private _countersClient;
    constructor();
    setReferences(references: IReferences): void;
    getCountersOperation(): (req: any, res: any) => void;
    getCountersAsTextOperation(): (req: any, res: any) => void;
    writeCounterOperation(): (req: any, res: any) => void;
    clearCountersOperation(): (req: any, res: any) => void;
    private getCounters(req, res);
    private counterToText(counter);
    private countersToText(counters);
    private getCountersAsText(req, res);
    private writeCounter(req, res);
    private clearCounters(req, res);
}
