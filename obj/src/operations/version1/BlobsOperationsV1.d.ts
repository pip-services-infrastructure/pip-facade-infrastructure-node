import { IReferences } from 'pip-services-commons-node';
import { FacadeOperations } from 'pip-services-facade-node';
export declare class BlobsOperationsV1 extends FacadeOperations {
    private _blobsClient;
    constructor();
    setReferences(references: IReferences): void;
    getBlobsOperation(): (req: any, res: any) => void;
    getBlobInfoOperation(): (req: any, res: any) => void;
    getBlobOperation(): (req: any, res: any) => void;
    setBlobOperation(): (req: any, res: any) => void;
    loadBlobFromUriOperation(): (req: any, res: any) => void;
    updateBlobInfoOperation(): (req: any, res: any) => void;
    deleteBlobOperation(): (req: any, res: any) => void;
    private getBlobs(req, res);
    private getBlobInfo(req, res);
    private getBlob(req, res);
    private setBlob(req, res);
    private loadBlobFromUri(req, res);
    private updateBlobInfo(req, res);
    private deleteBlob(req, res);
}
