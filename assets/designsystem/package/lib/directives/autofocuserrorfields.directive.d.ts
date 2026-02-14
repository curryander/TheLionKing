import { FocusOrigin } from '@angular/cdk/a11y';
import { AfterViewInit, OnDestroy, QueryList } from '@angular/core';
import { FormControlName, FormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
export interface FormAutoFocusConfig {
    onInit?: FocusFirstType;
    onSubmit?: FocusFirstWithErrorType;
    focusOrigin?: FocusOrigin;
}
export type FocusFirstType = 'none' | 'focusFirst' | 'focusFirstRequired';
export type FocusFirstWithErrorType = FocusFirstType | 'focusFirstWithError';
export declare class FormAutoFocusDirective implements AfterViewInit, OnDestroy {
    private readonly formGroupDirective;
    private readonly focusMonitor;
    private readonly repository;
    readonly formGroup: import("@angular/core").InputSignal<FormGroup<any>>;
    readonly formAutoFocusConfig: import("@angular/core").InputSignal<FormAutoFocusConfig>;
    formControls: QueryList<FormControlName>;
    private readonly subscriptions;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    get config(): FormAutoFocusConfig;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    focusFirst(): void;
    focusFirstRequired(): void;
    submittedFocusFirstWithError(): void;
    private registerOnSubmitHook;
    private switchFocus;
    private focusControl;
    private focusElement;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormAutoFocusDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<FormAutoFocusDirective, "[drv-form-auto-focus]", never, { "formGroup": { "alias": "formGroup"; "required": true; "isSignal": true; }; "formAutoFocusConfig": { "alias": "formAutoFocusConfig"; "required": true; "isSignal": true; }; }, {}, ["formControls"], never, true, never>;
}
