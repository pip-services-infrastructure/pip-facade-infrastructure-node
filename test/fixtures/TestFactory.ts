import { CompositeFactory } from 'pip-services-commons-node';
import { FacadeFactory } from 'pip-services-facade-node';
import { DefaultContainerFactory } from 'pip-services-container-node';

import { LoggingServiceFactory } from 'pip-services-logging-node';
import { LoggingClientFactory } from 'pip-clients-logging-node';
import { PerfMonServiceFactory } from 'pip-services-perfmon-node';
import { PerfMonClientFactory } from 'pip-clients-perfmon-node';
import { EventLogServiceFactory } from 'pip-services-eventlog-node';
import { EventLogClientFactory } from 'pip-clients-eventlog-node';
import { StatisticsServiceFactory } from 'pip-services-statistics-node';
import { StatisticsClientFactory } from 'pip-clients-statistics-node';
import { SettingsServiceFactory } from 'pip-services-settings-node';
import { SettingsClientFactory } from 'pip-clients-settings-node';
import { FacetsServiceFactory } from 'pip-services-facets-node';
import { FacetsClientFactory } from 'pip-clients-facets-node';
import { BlobsServiceFactory } from 'pip-services-blobs-node';
import { BlobsClientFactory } from 'pip-clients-blobs-node';
import { EmailClientFactory } from 'pip-clients-email-node';
import { EmailServiceFactory } from 'pip-services-email-node';
import { SmsClientFactory } from 'pip-clients-sms-node';
import { SmsServiceFactory } from 'pip-services-sms-node';

import { InfrastructureFacadeFactory } from '../../src/build/InfrastructureFacadeFactory';
import { TestFacadeFactory } from './TestFacadeFactory';

export class TestFactory extends DefaultContainerFactory {

    public constructor() {
        super();

        this.add(new FacadeFactory);
        this.add(new InfrastructureFacadeFactory);
        this.add(new TestFacadeFactory);

        this.add(new LoggingServiceFactory);
        this.add(new LoggingClientFactory);
        this.add(new PerfMonServiceFactory);
        this.add(new PerfMonClientFactory);
        this.add(new EventLogServiceFactory);
        this.add(new EventLogClientFactory);
        this.add(new StatisticsServiceFactory);
        this.add(new StatisticsClientFactory);
        this.add(new SettingsServiceFactory);
        this.add(new SettingsClientFactory);
        this.add(new FacetsServiceFactory);
        this.add(new FacetsClientFactory);
        this.add(new BlobsServiceFactory);
        this.add(new BlobsClientFactory);
        this.add(new EmailServiceFactory);
        this.add(new EmailClientFactory);
        this.add(new SmsServiceFactory);
        this.add(new SmsClientFactory);
    }

}
