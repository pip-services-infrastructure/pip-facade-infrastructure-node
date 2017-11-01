import { Descriptor } from 'pip-services-commons-node';
import { PartitionFacadeService } from 'pip-services-facade-node';
import { AboutOperations } from 'pip-services-facade-node';

import { LoggingOperationsV1 } from '../../src/operations/version1/LoggingOperationsV1';
import { CountersOperationsV1 } from '../../src/operations/version1/CountersOperationsV1';
import { EventLogOperationsV1 } from '../../src/operations/version1/EventLogOperationsV1';
import { SettingsOperationsV1 } from '../../src/operations/version1/SettingsOperationsV1';
import { StatisticsOperationsV1 } from '../../src/operations/version1/StatisticsOperationsV1';
import { BlobsOperationsV1 } from '../../src/operations/version1/BlobsOperationsV1';
import { EmailOperationsV1 } from '../../src/operations/version1/EmailOperationsV1';
import { SmsOperationsV1 } from '../../src/operations/version1/SmsOperationsV1';

export class TestFacadeService extends PartitionFacadeService {

    public constructor() {
        super();

        this._dependencyResolver.put('logging', new Descriptor("pip-facade-infrastructure", "operations", "logging", "*", "1.0"));
        this._dependencyResolver.put('counters', new Descriptor("pip-facade-infrastructure", "operations", "counters", "*", "1.0"));
        this._dependencyResolver.put('eventlog', new Descriptor("pip-facade-infrastructure", "operations", "eventlog", "*", "1.0"));
        this._dependencyResolver.put('settings', new Descriptor("pip-facade-infrastructure", "operations", "settings", "*", "1.0"));
        this._dependencyResolver.put('statistics', new Descriptor("pip-facade-infrastructure", "operations", "statistics", "*", "1.0"));
        this._dependencyResolver.put('blobs', new Descriptor("pip-facade-infrastructure", "operations", "blobs", "*", "1.0"));
        this._dependencyResolver.put('email', new Descriptor("pip-facade-infrastructure", "operations", "email", "*", "1.0"));
        this._dependencyResolver.put('sms', new Descriptor("pip-facade-infrastructure", "operations", "sms", "*", "1.0"));
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
            this.registerRoute('get', '/counters/text', counters.getCountersAsTextOperation());
            this.registerRoute('post', '/counters', counters.writeCounterOperation());
            this.registerRoute('del', '/counters', counters.clearCountersOperation());
        }

        let eventlog = this._dependencyResolver.getOneOptional<EventLogOperationsV1>('eventlog');
        if (eventlog) {
            this.registerRoute('get', '/eventlog', eventlog.getEventsOperation());
            this.registerRoute('post', '/eventlog', eventlog.logEventOperation());
        }

        let settings = this._dependencyResolver.getOneOptional<SettingsOperationsV1>('settings');
        if (settings) {
            this.registerRoute('get', '/settings', settings.getSectionsOperation());
            this.registerRoute('get', '/settings/ids', settings.getSectionIdsOperation());
            this.registerRoute('get', '/settings/:id', settings.getSectionOperation());
            this.registerRoute('get', '/settings/:id/:key', settings.getParameterOperation());
            this.registerRoute('post', '/settings/:id', settings.setSectionOperation());
            this.registerRoute('post', '/settings/:id/:key', settings.setParameterOperation());
            this.registerRoute('post', '/settings/:id/:key/increment', settings.incrementParameterOperation());
            this.registerRoute('put', '/settings/:id', settings.modifySectionOperation());
            this.registerRoute('del', '/settings/:id', settings.clearSectionOperation());
        }

        let statistics = this._dependencyResolver.getOneOptional<StatisticsOperationsV1>('statistics');
        if (statistics) {
            this.registerRoute('get', '/statistics/groups', statistics.getGroupsOperation());
            this.registerRoute('get', '/statistics/counters', statistics.getCountersOperation());
            this.registerRoute('post', '/statistics', statistics.readCountersOperation());
            this.registerRoute('get', '/statistics/:group', statistics.readCountersByGroupOperation());
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

        let email = this._dependencyResolver.getOneOptional<EmailOperationsV1>('email');
        if (email) {
            this.registerRoute('post', '/email', email.sendMessageOperation());
        }

        let sms = this._dependencyResolver.getOneOptional<SmsOperationsV1>('sms');
        if (sms) {
            this.registerRoute('post', '/sms', sms.sendMessageOperation());
        }
    }

}