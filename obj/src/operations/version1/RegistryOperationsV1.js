"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_facade_node_1 = require("pip-services-facade-node");
class RegistryOperationsV1 extends pip_services_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('registry', new pip_services_commons_node_2.Descriptor('pip-services-registry', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._registryClient = this._dependencyResolver.getOneRequired('registry');
    }
    getSectionIdsOperation() {
        return (req, res) => {
            this.getSectionIds(req, res);
        };
    }
    getSectionsOperation() {
        return (req, res) => {
            this.getSections(req, res);
        };
    }
    getSectionOperation() {
        return (req, res) => {
            this.getSection(req, res);
        };
    }
    setSectionOperation() {
        return (req, res) => {
            this.setSection(req, res);
        };
    }
    modifySectionOperation() {
        return (req, res) => {
            this.modifySection(req, res);
        };
    }
    getSectionIds(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        this._registryClient.getSectionIds(null, filter, paging, this.sendResult(req, res));
    }
    getSections(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        this._registryClient.getSections(null, filter, paging, this.sendResult(req, res));
    }
    getSection(req, res) {
        let id = req.route.params.id;
        this._registryClient.getSectionById(null, id, this.sendResult(req, res));
    }
    setSection(req, res) {
        let id = req.route.params.id;
        let parameters = pip_services_commons_node_1.ConfigParams.fromValue(req.body);
        this._registryClient.setSection(null, id, parameters, this.sendResult(req, res));
    }
    modifySection(req, res) {
        let id = req.route.params.id;
        let params = req.body;
        let updateParams = pip_services_commons_node_1.ConfigParams.fromValue(params.update_params);
        let incrementParams = pip_services_commons_node_1.ConfigParams.fromValue(params.increment_params);
        this._registryClient.modifySection(null, id, updateParams, incrementParams, this.sendResult(req, res));
    }
}
exports.RegistryOperationsV1 = RegistryOperationsV1;
//# sourceMappingURL=RegistryOperationsV1.js.map