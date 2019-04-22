let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { SettingsOperationsV1 } from '../../../src/operations/version1/SettingsOperationsV1';

suite('SettingsOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('pip-facade-infrastructure', 'operations', 'settings', 'default', '1.0'), new SettingsOperationsV1())
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should get settings section ids as admin', (done) => {
        rest.get(
            '/api/1.0/settings/ids?paging=1&skip=0&take=2',
            (err, req, res, page) => {
                assert.isNull(err);

                assert.isObject(page);

                done();
            }
        );
    });

    test('should get settings sections as admin', (done) => {
        rest.get(
            '/api/1.0/settings?paging=1&skip=0&take=2',
            (err, req, res, page) => {
                assert.isNull(err);

                assert.isObject(page);

                done();
            }
        );
    });

    test('should get user settings', (done) => {
        rest.get(
            '/api/1.0/settings/123',
            (err, req, res, parameters) => {
                assert.isNull(err);

                assert.isObject(parameters);

                done();
            }
        );
    });

    test('should set user settings', (done) => {
        let SETTINGS = ConfigParams.fromValue({
            privacy: {
                dashboard: { category: 'aboutme', hidden: false },
                journal: { category: 'aboutme', hidden: false },
                coulddo: { category: 'set', hidden: true }
            }
        });
        let settings1: ConfigParams;

        async.series([
        // Update party settings
            (callback) => {
                rest.post(
                    '/api/1.0/settings/123',
                    SETTINGS,
                    (err, req, res, settings) => {
                        assert.isNull(err);
                        
                        assert.isObject(settings);
                        settings1 = settings;

                        callback();
                    }
                );
            },
        // Read and check party settings
            (callback) => {
                rest.get(
                    '/api/1.0/settings/123',
                    (err, req, res, settings) => {
                        assert.isNull(err);

                        assert.deepEqual(settings, SETTINGS.getAsObject());

                        callback();
                    }
                );
            }
        ], done);
    });

});