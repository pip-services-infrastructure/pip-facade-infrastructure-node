"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const LoggingOperationsV1_1 = require("../operations/version1/LoggingOperationsV1");
const CountersOperationsV1_1 = require("../operations/version1/CountersOperationsV1");
const EventLogOperationsV1_1 = require("../operations/version1/EventLogOperationsV1");
const RegistryOperationsV1_1 = require("../operations/version1/RegistryOperationsV1");
const StatisticsOperationsV1_1 = require("../operations/version1/StatisticsOperationsV1");
const BlobsOperationsV1_1 = require("../operations/version1/BlobsOperationsV1");
class InfrastructureFacadeFactory extends pip_services_commons_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(InfrastructureFacadeFactory.LoggingOperationsV1Descriptor, LoggingOperationsV1_1.LoggingOperationsV1);
        this.registerAsType(InfrastructureFacadeFactory.CountersOperationsV1Descriptor, CountersOperationsV1_1.CountersOperationsV1);
        this.registerAsType(InfrastructureFacadeFactory.EventLogOperationsV1Descriptor, EventLogOperationsV1_1.EventLogOperationsV1);
        this.registerAsType(InfrastructureFacadeFactory.RegistryOperationsV1Descriptor, RegistryOperationsV1_1.RegistryOperationsV1);
        this.registerAsType(InfrastructureFacadeFactory.StatisticsOperationsV1Descriptor, StatisticsOperationsV1_1.StatisticsOperationsV1);
        this.registerAsType(InfrastructureFacadeFactory.BlobsOperationsV1Descriptor, BlobsOperationsV1_1.BlobsOperationsV1);
    }
}
InfrastructureFacadeFactory.Descriptor = new pip_services_commons_node_2.Descriptor("pip-facade-infrastructure", "factory", "default", "default", "1.0");
InfrastructureFacadeFactory.LoggingOperationsV1Descriptor = new pip_services_commons_node_2.Descriptor("pip-facade-infrastructure", "operations", "logging", "*", "1.0");
InfrastructureFacadeFactory.CountersOperationsV1Descriptor = new pip_services_commons_node_2.Descriptor("pip-facade-infrastructure", "operations", "counters", "*", "1.0");
InfrastructureFacadeFactory.EventLogOperationsV1Descriptor = new pip_services_commons_node_2.Descriptor("pip-facade-infrastructure", "operations", "eventlog", "*", "1.0");
InfrastructureFacadeFactory.RegistryOperationsV1Descriptor = new pip_services_commons_node_2.Descriptor("pip-facade-infrastructure", "operations", "registry", "*", "1.0");
InfrastructureFacadeFactory.StatisticsOperationsV1Descriptor = new pip_services_commons_node_2.Descriptor("pip-facade-infrastructure", "operations", "statistics", "*", "1.0");
InfrastructureFacadeFactory.BlobsOperationsV1Descriptor = new pip_services_commons_node_2.Descriptor("pip-facade-infrastructure", "operations", "blobs", "*", "1.0");
exports.InfrastructureFacadeFactory = InfrastructureFacadeFactory;
//# sourceMappingURL=InfrastructureFacadeFactory.js.map