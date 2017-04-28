import { IReferences } from 'pip-services-commons-node';
import { FacadeOperations } from 'pip-services-facade-node';
export declare class RegistryOperationsV1 extends FacadeOperations {
    private _registryClient;
    constructor();
    setReferences(references: IReferences): void;
    getSectionIdsOperation(): (req: any, res: any) => void;
    getSectionsOperation(): (req: any, res: any) => void;
    getSectionOperation(): (req: any, res: any) => void;
    setSectionOperation(): (req: any, res: any) => void;
    modifySectionOperation(): (req: any, res: any) => void;
    private getSectionIds(req, res);
    private getSections(req, res);
    private getSection(req, res);
    private setSection(req, res);
    private modifySection(req, res);
}
