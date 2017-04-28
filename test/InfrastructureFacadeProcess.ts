import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { TestFactory } from './fixtures/TestFactory';

export class InfrastructureFacadeProcess extends ProcessContainer {

    public constructor() {
        super("infrastructure", "Client facade for infrastructure microservice");
        this._factories.add(new TestFactory);
    }

}
