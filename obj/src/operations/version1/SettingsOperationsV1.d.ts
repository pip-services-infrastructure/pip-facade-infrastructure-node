import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class SettingsOperationsV1 extends FacadeOperations {
    private _settingsClient;
    constructor();
    setReferences(references: IReferences): void;
    getSectionIdsOperation(): (req: any, res: any) => void;
    getSectionsOperation(): (req: any, res: any) => void;
    getSectionOperation(): (req: any, res: any) => void;
    setSectionOperation(): (req: any, res: any) => void;
    getParameterOperation(): (req: any, res: any) => void;
    setParameterOperation(): (req: any, res: any) => void;
    incrementParameterOperation(): (req: any, res: any) => void;
    modifySectionOperation(): (req: any, res: any) => void;
    clearSectionOperation(): (req: any, res: any) => void;
    private getSectionIds(req, res);
    private getSections(req, res);
    private getSection(req, res);
    private setSection(req, res);
    private getParameter(req, res);
    private setParameter(req, res);
    private incrementParameter(req, res);
    private modifySection(req, res);
    private clearSection(req, res);
}
