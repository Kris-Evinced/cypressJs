/// <reference types="Cypress" />
/// <reference path="./axe.d.ts" />

import { EvOptionsEvAnalyze } from '../common/state/types';
import { CustomLabelInterface, TestRunInfoInterface } from '../common/uploadToPlatform';

type EvOptions = import('../common/state/types').EvOptions;
type EvStopOptions = import('../common/state/types').EvStopOptions;
type EvValidOptions = import('../common/state/types').EvValidOptions;
type Issue = import('../analysisWeb/types').Issue;

type SaveFileFormat = 'html'|'json'|'sarif'|'csv';

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * @description
             * Scans the current DOM snapshot and returns a list of accessibility issues.
             * (not supported during `evStart`)
             * @param {?Object} [options] - Options object
             * @param {?boolean} [options.logIssues = false] - Enable to log every issue to Cypress
             * @param {?string} [options.rootSelector = null] - A selector to scan only a subset of
             * the DOM
             * @param {?Object} [options.axeConfig = null] - See [Axe Core API](https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#api-name-axeconfigure)
             * @returns {Promise<Issue[]>} Cypress promise that will yield a list of issues
             * @example```
             cy.evAnalyze({ rootSelector: '#some .selector' }).should((issues) => {
    expect(issues).to.have.length(6);
});
             ```
             */
            evAnalyze(options?: EvOptionsEvAnalyze): Chainable<Issue[]>;

            /**
             * @description
             * Watches for DOM mutations and page navigations, recording all accessibility
             * issues until `evStop()` is called
             * @param {?Object} [options] - Options object
             * @param {?string} [options.rootSelector = null] - A selector to scan only a subset of
             * @param {?Object} [options.axeConfig = null] - See [Axe Core API](https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#api-name-axeconfigure)
             * @example```
             cy.evStart({ rootSelector: '#some .selector' });
             // Do DOM manipulations and navigate to other pages
             cy.evStop().should((issues) => {
    expect(issues).to.have.length(6);
});
             ```
             */
            evStart(options?: EvOptions): Chainable<void>;

            /**
             * @description
             * Returns all recorded issues since the last call to `evStart`.
             * @param {?Object} [options] - Options object
             * @param {?boolean} [options.logIssues = false] - Enable to log every issue to Cypress
             * @returns {Promise<Issue[]>} Cypress promise that will yield a list of issues
             * @example```
             cy.evStart();
             // Do DOM manipulations and navigate to other pages
             cy.evStop().should((issues) => {
    expect(issues).to.have.length(6);
});
             ```
             */
            evStop(options?: EvStopOptions): Chainable<Issue[]>;

            /**
             * @description
             * Saves the issues in a file with a specified format.
             * @param {Issue[]} [issues] - List of issues to be saved
             * @param {SaveFileFormat} [format] - The format in which file will be saved
             * @param {string} [destination] - Location where file will be saved
             * @returns {Chainable<void>} This command will return void as a Cypress promise
             * @example```
             cy.evAnalyze({ rootSelector: '#some .selector' }).then((issues) => {
            cy.evSaveFile(issues, 'html', 'results.html');
        });
             ```
             */
            // eslint-disable-next-line max-len
            evSaveFile(issues: Issue[], format: SaveFileFormat, destination: string):Chainable<void>;
            addLabel(value:TestRunInfoInterface):Chainable<void>;
            customLabel(value:CustomLabelInterface):Chainable<void>;
        }

        interface Chainer<Subject> {
            /**
             * @description
             * Custom Chai assertion that checks that there are no issues after
             * applying the provided filters.
             * @param {?Object} [options] - Options object
             * @param {?boolean} [options.ignoreSeverities = []] - ignore issues with the
             * provided severities
             * @param {?boolean} [options.ignoreTypes = []] - ignore issues with the provided type
             * @example```
             cy.evAnalyze().should('be.evValid', { ignoreSeverities: ['CRITICAL'] });
             ```
             */
            (chainer: 'be.evValid', options?: EvValidOptions): Chainable<Subject>
        }
    }
}
