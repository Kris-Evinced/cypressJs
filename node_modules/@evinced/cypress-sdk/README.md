# Evinced SDK for Cypress

A Cypress SDK to find accessability issues.

## Setup

```bash
npm install @evinced/cypress-sdk
```

Add to `cypress/support/index.js` or `cypress/support/e2e.js` (in case of using Cypress 10):
```js
import Evinced from '@evinced/cypress-sdk';
Evinced.init();
Evinced.setCredentials({ // in case of using online authentication
  serviceId: 'yourServiceId',
  secret: 'yourServiceSecret'
});
```
OR
```js
import Evinced from '@evinced/cypress-sdk';
Evinced.init();
Evinced.setOfflineCredentials({ // in case of using offline authentication
  serviceId: 'yourServiceId',
  token: 'yourToken'
});
```

## Example

A minimal working example (add in `cypress/integration/evinced.spec.js`):

```js
it('Evinced basic example', () => {
    cy.visit('https://demo.evinced.com/');
    cy.evAnalyze().should((issues) => {
        expect(issues).to.have.length(6);
    });
});
```

## API
### `Evinced.init(options)`
_Default options_
```js
{
    debug: false, // Outputs all Evinced verbose logs to Cypress
    axeConfig: null, // Set Axe configuration
    strict: false // Will throw exceptions on warnings
}
```

_Return value_
```ts
void;
```

_Side effects_
* Listens to Cypress events
    * `window:before:load` - Injects Evinced to the page, continues recording if needed
    * `window:before:unload` - Stores the state of the current page
    * `test:before:run` - Initializes test scope state
* Registers `ev` commands
    * `evAnalyze`
    * `evStart`
    * `evStop`
* Registers Chai assertions
    * `evValid`

### `Evinced.setCredentials({})`
_Description_

For using Evinced commands (such as `evStart` and `evAnalyze`) in your tests it is essential to set credentials after the `init` method.
The `setCredentials` method is used in case of online authentication. The method sets `serviceId` and `secret`.

_Return value_
```ts
void;
```

_Usage_

Set the credentials after the `init` method.

```ts
Evinced.setCredentials({ 
  serviceId: 'yourServiceId',
  secret: 'yourServiceSecret'
});
```

### `Evinced.setOfflineCredentials({})`
_Description_

For using Evinced commands (such as `evStart` and `evAnalyze`) in your tests it is essential to set credentials after the `init` method.
The `setOfflineCredentials` method is used in case of offline authentication. The method sets `serviceId` and `token`.

_Return value_
```ts
void;
```

_Usage_

Set the credentials after the `init` method.

```ts
Evinced.setOfflineCredentials({ 
  serviceId: 'yourServiceId',
  token: 'yourServiceToken'
});
```

### `cy.evAnalyze(options)`
_Default options_
```js
{
    logIssues: false, // Will log every accessibility issue to Cypress console
    rootSelector: null, // Set to scan only a subset of the DOM
    axeConfig: null // Set Axe configuration
}
```

_Return value_
```ts
Promise<Issue[]>;
```

_Example_
```js
cy.evAnalyze({ rootSelector: '#some .selector' }).should((issues) => {
    expect(issues).to.have.length(6);
});
```

_**Note**: `evAnalyze` during `evStart` is not supported yet_

### `cy.evStart(options)`
_Default options_
```js
{
    rootSelector: null, // Set to scan only a subset of the DOM
    axeConfig: null // Set Axe configuration
}
```

_Return value_
```ts
Promise<void>;
```

_Side effects_

Watching DOM mutations and recording all accessibility issues until `cy.evStop()` is called.

_Example_
```js
cy.visit('https://example.com/page-a');
cy.evStart({ rootSelector: '#some .selector' });
cy.visit('https://example.com/page-b');
cy.evStop().should((issues) => {
    expect(issues).to.have.length(6);
});
```

### `cy.evStop(options)`
_Default options_
```js
{
    logIssues: false // Will log every accessibility issue to Cypress console
}
```

_Return value_
```ts
Promise<Issue[]>;
```

_Example_
```js
cy.visit('https://example.com/page-a');
cy.evStart();
cy.get('#some .selector').click();
cy.visit('https://example.com/page-b');
cy.get('#another .selector').click();
cy.evStop().should((issues) => {
    expect(issues).to.have.length(10);
});
```

### `cy.evSaveFile(issues: Issue[], format: 'html'|'json'|'sarif', destination: string)`
_Arguments_
```
issues - list of issues to be saved in a report, yielded by evAnalyze
format - format in which report will be saved (html or json)
destination - location where to save the report
```

_Return value_
```ts
Promise<void>;
```

_Example_
```js
const reportDestination = '../reports/issuesReport.json';
cy.visit('https://example.com/page-a');
cy.evAnalyze().then((issues) => {
  cy.evSaveFile(issues, 'json', reportDestination);
});
```

### Types
```ts
type Issue = {
    id: string;
    index: string;
    signature: string;
    type: {
        id: string;
        name: string;
    };
    severity: {
        id: string;
        name: string;
    };
    summary: string;
    description: string;
    additionalInformation: any;
    duplicates?: string;
    elements: IssueElement[];
    firstSeenTime: number;
    tags: IssueTag[];
    knowledgeBaseLink?: string;
};

type IssueElement = {
    componentId: string;
    domSnippet: string;
    id: string;
    index: string;
    pageUrl: string;
    selector: string;
};

type IssueTag = {
    description: string;
    id: string;
    link: string;
};
```

## Axe Config
For the full Axe config options, see [Axe Core API](https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#api-name-axeconfigure).

You can set custom Axe options globally in `Evinced.init`, or per individual command in `evAnalyze` or `evStart`. If provided in both, the command config will be used.

Example:
```js
const axeConfig = {
    rules: {
        'link-name': { enabled: false }
    }
};

// Global config
Evinced.init({ axeConfig });

// Command config
cy.evAnalyze({ axeConfig });
cy.evStart({ axeConfig });
```

## Experimental

### Assertions
#### `issues.evValid(options)`
_Default options_
```js
{
    ignoreSeverities: [],
    ignoreTypes: []
}
```

_Side effects_

Throws a `chai` exception if any issues exist that don't match the provided filters:
```
expected #{this} to have no accessibility issues
```

_Example_
```js
cy.evAnalyze().should('be.evValid', {
    ignoreSeverities: ['CRITICAL'],
    ignoreTypes: ['NOT_FOCUSABLE']
});
```
