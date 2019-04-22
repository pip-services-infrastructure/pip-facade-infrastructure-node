import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';

import { TestFactory } from './fixtures/TestFactory';

export class InfrastructureFacadeProcess extends ProcessContainer {

    public constructor() {
        super("infrastructure", "Client facade for infrastructure microservice");
        this._factories.add(new TestFactory);
    }

}
