import { ConfigParams } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { Opener } from 'pip-services-commons-node';
import { Closer } from 'pip-services-commons-node';
import { Referencer } from 'pip-services-commons-node';
import { ManagedReferences } from 'pip-services-container-node';

import { MainFacadeService } from 'pip-services-facade-node';
import { TestFactory } from './TestFactory';
import { TestFacadeService } from './TestFacadeService';

export class TestReferences extends ManagedReferences {
    private _factory = new TestFactory();

    public constructor() {
        super();

        this.appendCore();
        this.appendMicroservices();
        this.appendFacade();

        this.configureService();
    }

    private appendCore(): void {
        this.put(null, this._factory);

        //this.append(new Descriptor('pip-services-commons', 'logger', 'console', 'default', '*'));
        //this.append(new Descriptor('pip-services-commons', 'counters', 'log', 'default', '*'));
        this.append(new Descriptor('pip-services-logging', 'logger', 'direct', 'default', '*'));
        this.append(new Descriptor('pip-services-counters', 'counters', 'direct', 'default', '*'));

        this.append(new Descriptor('pip-services-facade', 'service', 'main', 'default', '*'));
    }

    private appendMicroservices(): void {
        this.append(new Descriptor('pip-services-logging', 'persistence', 'memory', 'default', '*'));
        this.append(new Descriptor('pip-services-logging', 'controller', 'default', 'default', '*'));
        this.append(new Descriptor('pip-services-logging', 'client', 'direct', 'default', '*'));
        this.append(new Descriptor('pip-services-counters', 'persistence', 'memory', 'default', '*'));
        this.append(new Descriptor('pip-services-counters', 'controller', 'default', 'default', '*'));
        this.append(new Descriptor('pip-services-counters', 'client', 'direct', 'default', '*'));
        this.append(new Descriptor('pip-services-eventlog', 'persistence', 'memory', 'default', '*'));
        this.append(new Descriptor('pip-services-eventlog', 'controller', 'default', 'default', '*'));
        this.append(new Descriptor('pip-services-eventlog', 'client', 'direct', 'default', '*'));
        this.append(new Descriptor('pip-services-statistics', 'persistence', 'memory', 'default', '*'));
        this.append(new Descriptor('pip-services-statistics', 'controller', 'default', 'default', '*'));
        this.append(new Descriptor('pip-services-statistics', 'client', 'direct', 'default', '*'));
        this.append(new Descriptor('pip-services-settings', 'persistence', 'memory', 'default', '*'));
        this.append(new Descriptor('pip-services-settings', 'controller', 'default', 'default', '*'));
        this.append(new Descriptor('pip-services-settings', 'client', 'direct', 'default', '*'));
        this.append(new Descriptor('pip-services-blobs', 'persistence', 'memory', 'default', '*'));
        this.append(new Descriptor('pip-services-blobs', 'controller', 'default', 'default', '*'));
        this.append(new Descriptor('pip-services-blobs', 'client', 'direct', 'default', '*'));
    }

    private appendFacade(): void {
        this.append(new Descriptor('pip-services-facade', 'service', 'test', 'default', '1.0'));
    }

    public append(descriptor: Descriptor): void {
        let component = this._factory.create(descriptor);
        this.put(descriptor, component);
    }

    private configureService(): void {
        // Configure Facade service
        let service = this.getOneRequired<MainFacadeService>(
            new Descriptor('pip-services-facade', 'service', 'main', 'default', '*')
        );
        service.configure(ConfigParams.fromTuples(
            'root_path', '/api/1.0',
            'connection.protocol', 'http',
            'connection.host', '0.0.0.0',
            'connection.port', 3000
        ));
    }

}