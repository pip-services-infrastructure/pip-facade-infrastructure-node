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
    private getSectionIds;
    private getSections;
    private getSection;
    private setSection;
    private getParameter;
    private setParameter;
    private incrementParameter;
    private modifySection;
    private clearSection;
}
