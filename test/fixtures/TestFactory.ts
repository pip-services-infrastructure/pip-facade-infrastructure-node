import { CompositeFactory } from 'pip-services-commons-node';
import { FacadeFactory } from 'pip-services-facade-node';
import { DefaultContainerFactory } from 'pip-services-container-node';

import { LoggingServiceFactory } from 'pip-services-logging-node';
import { LoggingClientFactory } from 'pip-clients-logging-node';
import { CountersServiceFactory } from 'pip-services-counters-node';
import { CountersClientFactory } from 'pip-clients-counters-node';
import { EventLogServiceFactory } from 'pip-services-eventlog-node';
import { EventLogClientFactory } from 'pip-clients-eventlog-node';
import { StatisticsServiceFactory } from 'pip-services-statistics-node';
import { StatisticsClientFactory } from 'pip-clients-statistics-node';
import { RegistryServiceFactory } from 'pip-services-registry-node';
import { RegistryClientFactory } from 'pip-clients-registry-node';
import { FacetsServiceFactory } from 'pip-services-facets-node';
import { FacetsClientFactory } from 'pip-clients-facets-node';
import { BlobsServiceFactory } from 'pip-services-blobs-node';
import { BlobsClientFactory } from 'pip-clients-blobs-node';

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
        this.add(new CountersServiceFactory);
        this.add(new CountersClientFactory);
        this.add(new EventLogServiceFactory);
        this.add(new EventLogClientFactory);
        this.add(new StatisticsServiceFactory);
        this.add(new StatisticsClientFactory);
        this.add(new RegistryServiceFactory);
        this.add(new RegistryClientFactory);
        this.add(new FacetsServiceFactory);
        this.add(new FacetsClientFactory);
        this.add(new BlobsServiceFactory);
        this.add(new BlobsClientFactory);
    }

}
