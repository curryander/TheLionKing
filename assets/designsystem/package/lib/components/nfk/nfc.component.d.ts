import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NotificationService } from '../notification/notification.service';
import * as i0 from "@angular/core";
export interface NfcFeedbackResult {
    identifier: string;
    value?: number | string;
}
export declare class NFComponent {
    private nService;
    private fb;
    readonly id: import("@angular/core").InputSignal<string>;
    readonly required: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly feedbackTitle: import("@angular/core").InputSignal<string>;
    readonly question: import("@angular/core").InputSignal<string>;
    readonly buttonText: import("@angular/core").InputSignal<string>;
    readonly successTitle: import("@angular/core").InputSignal<string>;
    readonly successText: import("@angular/core").InputSignal<string>;
    readonly errorText: import("@angular/core").InputSignal<string>;
    readonly hasFreeText: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly freeTextLabel: import("@angular/core").InputSignal<string>;
    readonly freeTextMaxLength: import("@angular/core").InputSignal<number>;
    readonly formSubmit: import("@angular/core").OutputEmitterRef<NfcFeedbackResult[]>;
    form: UntypedFormGroup;
    protected isSubmitted: boolean;
    protected invalidOnSubmit: boolean;
    private questionIdentifier;
    private freeTextIdentifier;
    constructor(nService: NotificationService, fb: UntypedFormBuilder);
    protected get containerCssClasses(): string;
    onSubmit(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NFComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NFComponent, "drv-nfk", never, { "id": { "alias": "id"; "required": false; "isSignal": true; }; "required": { "alias": "required"; "required": false; "isSignal": true; }; "feedbackTitle": { "alias": "feedbackTitle"; "required": false; "isSignal": true; }; "question": { "alias": "question"; "required": false; "isSignal": true; }; "buttonText": { "alias": "buttonText"; "required": false; "isSignal": true; }; "successTitle": { "alias": "successTitle"; "required": false; "isSignal": true; }; "successText": { "alias": "successText"; "required": false; "isSignal": true; }; "errorText": { "alias": "errorText"; "required": false; "isSignal": true; }; "hasFreeText": { "alias": "hasFreeText"; "required": false; "isSignal": true; }; "freeTextLabel": { "alias": "freeTextLabel"; "required": false; "isSignal": true; }; "freeTextMaxLength": { "alias": "freeTextMaxLength"; "required": false; "isSignal": true; }; }, { "formSubmit": "formSubmit"; }, never, ["drv-button"], true, never>;
}
