let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';

import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { LoggingOperationsV1 } from '../../../src/operations/version1/LoggingOperationsV1';

suite('LoggingOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('pip-services-facade', 'operations', 'logging', 'default', '1.0'), new LoggingOperationsV1())
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should get logged messages as admin', (done) => {
        rest.get(
            '/api/1.0/logging?paging=1&skip=0&take=2',
            (err, req, res, page) => {
                assert.isNull(err);

                assert.isObject(page);

                done();
            }
        );
    });

    test('should get logged errors as admin', (done) => {
        rest.get(
            '/api/1.0/logging/errors?paging=1&skip=0&take=2',
            (err, req, res, page) => {
                assert.isNull(err);

                assert.isObject(page);

                done();
            }
        );
    });

    test('should clear log as admin', (done) => {
        rest.del(
            '/api/1.0/logging',
            (err, req, res) => {
                assert.isNull(err);
                done();
            }
        );
    });

});