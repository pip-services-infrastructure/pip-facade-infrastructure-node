let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { IStatisticsClientV1 } from 'pip-clients-statistics-node';

import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { StatisticsOperationsV1 } from '../../../src/operations/version1/StatisticsOperationsV1';

suite('StatisticsOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;
    let statisticsClient: IStatisticsClientV1;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('pip-services-facade', 'operations', 'statistics', 'default', '1.0'), new StatisticsOperationsV1())
        statisticsClient = references.getOneRequired<IStatisticsClientV1>(
            new Descriptor('pip-services-statistics', 'client', '*', '*', '*')
        );
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should get statistics groups as admin', (done) => {
        rest.get(
            '/api/1.0/statistics/groups?paging=1&skip=0&take=2',
            (err, req, res, page) => {
                assert.isNull(err);

                assert.isObject(page);

                done();
            }
        );
    });

    test('should get statistics counters as admin', (done) => {
        rest.get(
            '/api/1.0/statistics/counters?paging=1&skip=0&take=2',
            (err, req, res, page) => {
                assert.isNull(err);

                assert.isObject(page);

                done();
            }
        );
    });

    test('should read statistics counters as admin', (done) => {
        rest.post(
            '/api/1.0/statistics?type=0',
            [
                { group: 'test', name: 'value1' },
                { group: 'test', name: 'value2' }
            ],
            (err, req, res, sets) => {
                assert.isNull(err);

                assert.isArray(sets);

                done();
            }
        );
    });

    test('should get user statistics', (done) => {
        async.series([
            (callback) => {
                statisticsClient.incrementCounter(
                    null, '123', 'test', 1, callback
                );
            },
            (callback) => {
                rest.get(
                    '/api/1.0/statistics/123/test?type=0',
                    (err, req, res, set) => {
                        assert.isNull(err);

                        assert.isObject(set);
                        assert.lengthOf(set.values, 1);
                        assert.equal(1, set.values[0].value);

                        callback();
                    }
                );
            },
            (callback) => {
                rest.get(
                    '/api/1.0/statistics/123?type=0',
                    (err, req, res, sets) => {
                        assert.isNull(err);

                        assert.isArray(sets);
                        assert.lengthOf(sets, 1);

                        callback();
                    }
                );
            }
        ], done)
    });

});