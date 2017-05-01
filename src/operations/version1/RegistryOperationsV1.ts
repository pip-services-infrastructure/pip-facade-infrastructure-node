let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node'; 
import { DependencyResolver } from 'pip-services-commons-node';
import { LongConverter } from 'pip-services-commons-node';

import { IRegistryClientV1 } from 'pip-clients-registry-node';

import { FacadeOperations } from 'pip-services-facade-node';

export class RegistryOperationsV1  extends FacadeOperations {
    private _registryClient: IRegistryClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('registry', new Descriptor('pip-services-registry', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._registryClient = this._dependencyResolver.getOneRequired<IRegistryClientV1>('registry');
    }

    public getSectionIdsOperation() {
        return (req, res) => {
            this.getSectionIds(req, res);
        }
    }

    public getSectionsOperation() {
        return (req, res) => {
            this.getSections(req, res);
        }
    }

    public getSectionOperation() {
        return (req, res) => {
            this.getSection(req, res);
        }
    }

    public setSectionOperation() {
        return (req, res) => {
            this.setSection(req, res);
        }
    }

    public getParameterOperation() {
        return (req, res) => {
            this.getParameter(req, res);
        }
    }

    public setParameterOperation() {
        return (req, res) => {
            this.setParameter(req, res);
        }
    }

    public incrementParameterOperation() {
        return (req, res) => {
            this.incrementParameter(req, res);
        }
    }

    public modifySectionOperation() {
        return (req, res) => {
            this.modifySection(req, res);
        }
    }

    public clearSectionOperation() {
        return (req, res) => {
            this.clearSection(req, res);
        }
    }

    private getSectionIds(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        this._registryClient.getSectionIds(
            null, filter, paging, this.sendResult(req, res)
        );
    }

    private getSections(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        this._registryClient.getSections(
            null, filter, paging, this.sendResult(req, res)
        );
    }

    private getSection(req: any, res: any): void {
        let id = req.param('id') || req.param('section');

        this._registryClient.getSectionById(
            null, id, this.sendResult(req, res)
        );
    }

    private setSection(req: any, res: any): void {
        let id = req.param('id') || req.param('section');
        let parameters = ConfigParams.fromValue(req.body);

        this._registryClient.setSection(
            null, id, parameters, this.sendResult(req, res)
        );
    }

    private getParameter(req: any, res: any): void {
        let id = req.param('id') || req.param('section');
        let key = req.param('key') || req.param('param');

        this._registryClient.getSectionById(
            null, id, (err, parameters) => {
                let value = parameters ? parameters.get(key) : null;
                this.sendResult(req, res)(err, value);
            }
        );
    }

    private setParameter(req: any, res: any): void {
        let id = req.param('id') || req.param('section');
        let key = req.param('key') || req.param('param');
        let value = req.param('value');
        let updateParams = ConfigParams.fromTuples(
            key, value
        );

        this._registryClient.modifySection(
            null, id, updateParams, null, (err, parameters) => {
                let value = parameters ? parameters.get(key) : null;
                this.sendResult(req, res)(err, value);
            }
        );
    }

    private incrementParameter(req: any, res: any): void {
        let id = req.param('id') || req.param('section');
        let key = req.param('key') || req.param('param');
        let value = LongConverter.toLong(req.param('value') || req.param('count'));
        let incrementParams = ConfigParams.fromTuples(
            key, value
        );

        this._registryClient.modifySection(
            null, id, null, incrementParams, (err, parameters) => {
                let value = parameters ? parameters.get(key) : null;
                this.sendResult(req, res)(err, value);
            }
        );
    }

    private modifySection(req: any, res: any): void {
        let id = req.param('id') || req.param('section');
        let params = req.body || {};
        let updateParams = ConfigParams.fromValue(params.update_params);
        let incrementParams = ConfigParams.fromValue(params.increment_params);

        this._registryClient.modifySection(
            null, id, updateParams, incrementParams, this.sendResult(req, res)
        );
    }

    private clearSection(req: any, res: any): void {
        let id = req.param('id') || req.param('section');

        this._registryClient.setSection(
            null, id, new ConfigParams(), this.sendEmptyResult(req, res)
        );
    }

}