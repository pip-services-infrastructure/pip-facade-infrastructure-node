import { Descriptor } from 'pip-services-commons-node';
import { PartitionFacadeService } from 'pip-services-facade-node';
import { AboutOperations } from 'pip-services-facade-node';

import { LoggingOperationsV1 } from '../../src/operations/version1/LoggingOperationsV1';
import { CountersOperationsV1 } from '../../src/operations/version1/CountersOperationsV1';
import { EventLogOperationsV1 } from '../../src/operations/version1/EventLogOperationsV1';
import { RegistryOperationsV1 } from '../../src/operations/version1/RegistryOperationsV1';
import { StatisticsOperationsV1 } from '../../src/operations/version1/StatisticsOperationsV1';
import { BlobsOperationsV1 } from '../../src/operations/version1/BlobsOperationsV1';

export class TestFacadeService extends PartitionFacadeService {

    public constructor() {
        super();

        this._dependencyResolver.put('logging', new Descriptor("pip-facade-infrastructure", "operations", "logging", "*", "1.0"));
        this._dependencyResolver.put('counters', new Descriptor("pip-facade-infrastructure", "operations", "counters", "*", "1.0"));
        this._dependencyResolver.put('eventlog', new Descriptor("pip-facade-infrastructure", "operations", "eventlog", "*", "1.0"));
        this._dependencyResolver.put('registry', new Descriptor("pip-facade-infrastructure", "operations", "registry", "*", "1.0"));
        this._dependencyResolver.put('statistics', new Descriptor("pip-facade-infrastructure", "operations", "statistics", "*", "1.0"));
        this._dependencyResolver.put('blobs', new Descriptor("pip-facade-infrastructure", "operations", "blobs", "*", "1.0"));
    }

    protected register(): void {
        let logging = this._dependencyResolver.getOneOptional<LoggingOperationsV1>('logging');
        if (logging) {
            this.registerRoute('get', '/logging', logging.getMessagesOperation());
            this.registerRoute('get', '/logging/errors', logging.getErrorsOperation());
            this.registerRoute('get', '/logging/text', logging.getMessagesAsTextOperation());
            this.registerRoute('get', '/logging/errors/text', logging.getErrorsAsTextOperation());
            this.registerRoute('post', '/logging', logging.writeMessageOperation());
            this.registerRoute('del', '/logging', logging.clearMessagesOperation());
        }

        let counters = this._dependencyResolver.getOneOptional<CountersOperationsV1>('counters');
        if (counters) {
            this.registerRoute('get', '/counters', counters.getCountersOperation());
            this.registerRoute('post', '/counters', counters.writeCounterOperation());
            this.registerRoute('del', '/counters', counters.clearCountersOperation());
        }

        let eventlog = this._dependencyResolver.getOneOptional<EventLogOperationsV1>('eventlog');
        if (eventlog) {
            this.registerRoute('get', '/eventlog', eventlog.getEventsOperation());
            this.registerRoute('post', '/eventlog', eventlog.logEventOperation());
        }

        let registry = this._dependencyResolver.getOneOptional<RegistryOperationsV1>('registry');
        if (registry) {
            this.registerRoute('get', '/registry', registry.getSectionsOperation());
            this.registerRoute('get', '/registry/ids', registry.getSectionIdsOperation());
            this.registerRoute('get', '/registry/:id', registry.getSectionOperation());
            this.registerRoute('get', '/registry/:id/:key', registry.getParameterOperation());
            this.registerRoute('post', '/registry/:id', registry.setSectionOperation());
            this.registerRoute('post', '/registry/:id/:key', registry.setParameterOperation());
            this.registerRoute('post', '/registry/:id/:key/increment', registry.incrementParameterOperation());
            this.registerRoute('put', '/registry/:id', registry.modifySectionOperation());
            this.registerRoute('del', '/registry/:id', registry.clearSectionOperation());
        }

        let statistics = this._dependencyResolver.getOneOptional<StatisticsOperationsV1>('statistics');
        if (statistics) {
            this.registerRoute('get', '/statistics/groups', statistics.getGroupsOperation());
            this.registerRoute('get', '/statistics/counters', statistics.getCountersOperation());
            this.registerRoute('post', '/statistics', statistics.readCountersOperation());
            this.registerRoute('get', '/statistics/:group/:name', statistics.readCounterOperation());
            this.registerRoute('post', '/statistics/:group/:name', statistics.incrementCounterOperation());
        }

        let blobs = this._dependencyResolver.getOneOptional<BlobsOperationsV1>('blobs');
        if (blobs) {
            this.registerRoute('get', '/blobs', blobs.getBlobsOperation());
            this.registerRoute('get', '/blobs/:blob_id/info', blobs.getBlobInfoOperation());
            this.registerRoute('get', '/blobs/:blob_id', blobs.getBlobOperation());
            this.registerRoute('post', '/blobs', blobs.setBlobOperation());
            this.registerRoute('put', '/blobs/:blob_id/info', blobs.updateBlobInfoOperation());
            this.registerRoute('put', '/blobs/:blob_id', blobs.setBlobOperation());
            this.registerRoute('del', '/blobs/:blob_id', blobs.deleteBlobOperation());

            this.registerRoute('get', '/avatars/:blob_id', blobs.getBlobOperation());
            this.registerRoute('put', '/avatars/:blob_id', blobs.setBlobOperation());
            this.registerRoute('del', '/avatars/:blob_id', blobs.deleteBlobOperation());
        }
    }

}