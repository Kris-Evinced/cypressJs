/// <reference path="./evCommands.d.ts" />
/// <reference path="./axe.d.ts" />

type EvOptions = import('../common/state/types').EvOptions;

type UploadToPlatformConfig = {
    enableUploadToPlatform: boolean
    setUploadToPlatformDefault?: boolean // false by default
}

type OfflineCredentials = {
    serviceId: string;
    token: string;
}

type Credentials = {
    serviceId: string;
    secret: string;
}

declare module Evinced {
    /**
     * @description
     * Initializes Evinced commands, and listens to Cypress events to automatically inject Evinced
     * into visited pages. Recommended to use in cypress/support/index.js
     * @param {?Object} [options] - Global options object
     * @param {?boolean} [options.debug = false] - Enable to log every issue to Cypress console
     * @param {?Object} [options.axeConfig = null] - See [Axe Core API](https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#api-name-axeconfigure)
     * @param {?boolean} [options.strict = false] - Enable to throw exceptions on warnings
     * @example ```Evinced.init({ debug: true });```
     */
    function init(options?: EvOptions): void;

    /**
     * @description
     * Sets credentials for Evinced. Call the function after init().
     * Receives authorization token from a server by provided params.
     * Is needed for a correct calling of the Evinced commands.
     * @param credentials - an object which contains serviceId and a secret.
     * @example ```Evinced.setCredentials({ serviceId: 'id', secret: 'secret' });```
     */
    function setCredentials(credentials: Credentials): void;

    /**
     * @description
     * Sets credentials for Evinced. Call the function after init().
     * Is needed for a correct calling of the Evinced commands.
     * @param credentials - an object which contains serviceId and a token.
     * @example ```Evinced.setCredentials({ serviceId: 'id', token: 'token' });```
     */
    function setOfflineCredentials(credentials: OfflineCredentials);
    function setUploadToPlatformConfig(config: UploadToPlatformConfig);
    function cyTaskUploadToPlatform();
}

export default Evinced;
