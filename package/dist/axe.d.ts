// Axe Core (Can't use the original types as they are not exported)
// https://github.com/dequelabs/axe-core/blob/develop/axe.d.ts

declare namespace axe {
    type TagValue = string;
    type ReporterVersion = 'v1' | 'v2' | 'raw' | 'raw-env' | 'no-passes';
    type RunOnlyType = 'rule' | 'rules' | 'tag' | 'tags';
    type resultGroups = 'inapplicable' | 'passes' | 'incomplete' | 'violations';
    interface RunOnly {
        type: RunOnlyType;
        values: TagValue[] | string[];
    }
    interface RuleObject {
        [key: string]: {
            enabled: boolean;
        };
    }
    export interface RunOptions {
        runOnly?: RunOnly | TagValue[] | string[];
        rules?: RuleObject;
        reporter?: ReporterVersion;
        resultTypes?: resultGroups[];
        selectors?: boolean;
        ancestry?: boolean;
        xpath?: boolean;
        absolutePaths?: boolean;
        iframes?: boolean;
        elementRef?: boolean;
        frameWaitTime?: number;
        preload?: boolean;
        performanceTimer?: boolean;
    }
}
