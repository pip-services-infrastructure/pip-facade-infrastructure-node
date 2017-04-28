import { Factory } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';

import { LoggingOperationsV1 } from '../operations/version1/LoggingOperationsV1';
import { CountersOperationsV1 } from '../operations/version1/CountersOperationsV1';
import { EventLogOperationsV1 } from '../operations/version1/EventLogOperationsV1';
import { RegistryOperationsV1 } from '../operations/version1/RegistryOperationsV1';
import { StatisticsOperationsV1 } from '../operations/version1/StatisticsOperationsV1';
import { BlobsOperationsV1 } from '../operations/version1/BlobsOperationsV1';

export class InfrastructureFacadeFactory extends Factory {
	public static Descriptor = new Descriptor("pip-facade-infrastructure", "factory", "default", "default", "1.0");

	public static LoggingOperationsV1Descriptor = new Descriptor("pip-facade-infrastructure", "operations", "logging", "*", "1.0");
	public static CountersOperationsV1Descriptor = new Descriptor("pip-facade-infrastructure", "operations", "counters", "*", "1.0");
	public static EventLogOperationsV1Descriptor = new Descriptor("pip-facade-infrastructure", "operations", "eventlog", "*", "1.0");
	public static RegistryOperationsV1Descriptor = new Descriptor("pip-facade-infrastructure", "operations", "registry", "*", "1.0");
	public static StatisticsOperationsV1Descriptor = new Descriptor("pip-facade-infrastructure", "operations", "statistics", "*", "1.0");
	public static BlobsOperationsV1Descriptor = new Descriptor("pip-facade-infrastructure", "operations", "blobs", "*", "1.0");
	
	public constructor() {
		super();

		this.registerAsType(InfrastructureFacadeFactory.LoggingOperationsV1Descriptor, LoggingOperationsV1);
		this.registerAsType(InfrastructureFacadeFactory.CountersOperationsV1Descriptor, CountersOperationsV1);
		this.registerAsType(InfrastructureFacadeFactory.EventLogOperationsV1Descriptor, EventLogOperationsV1);
		this.registerAsType(InfrastructureFacadeFactory.RegistryOperationsV1Descriptor, RegistryOperationsV1);
		this.registerAsType(InfrastructureFacadeFactory.StatisticsOperationsV1Descriptor, StatisticsOperationsV1);
		this.registerAsType(InfrastructureFacadeFactory.BlobsOperationsV1Descriptor, BlobsOperationsV1);
	}
	
}
