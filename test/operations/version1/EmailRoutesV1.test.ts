let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { EmailController } from 'pip-services-email-node';

import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { EmailOperationsV1 } from '../../../src/operations/version1/EmailOperationsV1';

suite('EmailOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;
    let emailController: EmailController;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('pip-facade-infrastructure', 'operations', 'email', 'default', '1.0'), new EmailOperationsV1())
        emailController = references.getOneRequired<EmailController>(
            new Descriptor('pip-services-email', 'controller', '*', '*', '1.0')
        );
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should send message', (done) => {
        let message = {
            to: 'test1@somewhere.com',
            subject: 'Test',
            text: 'This is a test message'
        };

        async.series([
            (callback) => {
                rest.post(
                    '/api/1.0/email',
                    message,
                    (err, req, res) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            }
        ], done);
    });

});