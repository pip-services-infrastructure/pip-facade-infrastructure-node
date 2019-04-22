import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class BlobsOperationsV1 extends FacadeOperations {
    private _blobsClient;
    constructor();
    setReferences(references: IReferences): void;
    getBlobsOperation(): (req: any, res: any) => void;
    getBlobInfoOperation(): (req: any, res: any) => void;
    getBlobOperation(): (req: any, res: any) => void;
    setBlobOperation(): (req: any, res: any) => void;
    loadBlobFromUrlOperation(): (req: any, res: any) => void;
    updateBlobInfoOperation(): (req: any, res: any) => void;
    deleteBlobOperation(): (req: any, res: any) => void;
    private getBlobs;
    private getBlobInfo;
    private getBlob;
    private setBlob;
    private loadBlobFromUrl;
    private updateBlobInfo;
    private deleteBlob;
}
