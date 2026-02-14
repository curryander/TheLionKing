import type { BackgroundUI } from '../../types';
import * as i0 from "@angular/core";
export interface FormItemMessage {
    message: string;
    type?: string;
}
export declare class FormitemComponent {
    readonly id: import("@angular/core").InputSignal<string>;
    readonly cssClass: import("@angular/core").InputSignal<string>;
    readonly hasError: import("@angular/core").ModelSignal<boolean>;
    readonly errorText: import("@angular/core").ModelSignal<FormItemMessage[]>;
    readonly errorPrefix: import("@angular/core").InputSignal<string>;
    readonly hasInfo: import("@angular/core").ModelSignal<boolean>;
    readonly infoText: import("@angular/core").ModelSignal<FormItemMessage[]>;
    readonly infoPrefix: import("@angular/core").InputSignal<string>;
    readonly hasWarning: import("@angular/core").ModelSignal<boolean>;
    readonly warningText: import("@angular/core").ModelSignal<FormItemMessage[]>;
    readonly warningPrefix: import("@angular/core").InputSignal<string>;
    readonly disabled: import("@angular/core").ModelSignal<boolean>;
    readonly collapseMessages: import("@angular/core").ModelSignal<boolean>;
    readonly backgroundUI: import("@angular/core").InputSignal<BackgroundUI>;
    readonly announceChanges: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    protected externalId: string;
    protected trackByFn: (index: number) => number;
    protected get containerCssClasses(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormitemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormitemComponent, "drv-formitem", never, { "id": { "alias": "id"; "required": false; "isSignal": true; }; "cssClass": { "alias": "cssClass"; "required": false; "isSignal": true; }; "hasError": { "alias": "hasError"; "required": false; "isSignal": true; }; "errorText": { "alias": "errorText"; "required": false; "isSignal": true; }; "errorPrefix": { "alias": "errorPrefix"; "required": false; "isSignal": true; }; "hasInfo": { "alias": "hasInfo"; "required": false; "isSignal": true; }; "infoText": { "alias": "infoText"; "required": false; "isSignal": true; }; "infoPrefix": { "alias": "infoPrefix"; "required": false; "isSignal": true; }; "hasWarning": { "alias": "hasWarning"; "required": false; "isSignal": true; }; "warningText": { "alias": "warningText"; "required": false; "isSignal": true; }; "warningPrefix": { "alias": "warningPrefix"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "collapseMessages": { "alias": "collapseMessages"; "required": false; "isSignal": true; }; "backgroundUI": { "alias": "backgroundUI"; "required": false; "isSignal": true; }; "announceChanges": { "alias": "announceChanges"; "required": false; "isSignal": true; }; }, { "hasError": "hasErrorChange"; "errorText": "errorTextChange"; "hasInfo": "hasInfoChange"; "infoText": "infoTextChange"; "hasWarning": "hasWarningChange"; "warningText": "warningTextChange"; "disabled": "disabledChange"; "collapseMessages": "collapseMessagesChange"; }, never, ["*"], true, never>;
}
