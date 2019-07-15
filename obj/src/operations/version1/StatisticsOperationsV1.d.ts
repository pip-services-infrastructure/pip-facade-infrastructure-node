import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class StatisticsOperationsV1 extends FacadeOperations {
    private _statisticsClient;
    constructor();
    setReferences(references: IReferences): void;
    getGroupsOperation(): (req: any, res: any) => void;
    getCountersOperation(): (req: any, res: any) => void;
    readCounterOperation(): (req: any, res: any) => void;
    readCountersByGroupOperation(): (req: any, res: any) => void;
    readCountersOperation(): (req: any, res: any) => void;
    incrementCounterOperation(): (req: any, res: any) => void;
    private getGroups(req, res);
    private getCounters(req, res);
    private readCounter(req, res);
    private readCountersByGroup(req, res);
    private readCounters(req, res);
    private incrementCounter(req, res);
}
