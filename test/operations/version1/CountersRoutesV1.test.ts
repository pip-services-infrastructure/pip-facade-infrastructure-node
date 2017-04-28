let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';

import { TestFactory } from '../../fixtures/TestFactory';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { CountersOperationsV1 } from '../../../src/operations/version1/CountersOperationsV1';

suite('CountersOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('pip-services-facade', 'operations', 'counters', 'default', '1.0'), new CountersOperationsV1())
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should get counters as admin', (done) => {
        rest.get(
            '/api/1.0/counters?paging=1&skip=0&take=2',
            (err, req, res, page) => {
                assert.isNull(err);

                assert.isObject(page);

                done();
            }
        );
    });

    test('should clear counters as admin', (done) => {
        rest.del(
            '/api/1.0/counters',
            (err, req, res) => {
                assert.isNull(err);
                done();
            }
        );
    });

});