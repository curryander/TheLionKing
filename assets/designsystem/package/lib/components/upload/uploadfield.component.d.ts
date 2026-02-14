import { AfterViewInit, TemplateRef, ElementRef } from '@angular/core';
import { FormitemComponent } from '../formitem/formitem.component';
import { ValueAccessorDirective } from '../../directives/valueaccessor.directive';
import * as i0 from "@angular/core";
import * as i1 from "../../directives/valueaccessor.directive";
export type UploadFieldVariantType = 'basic' | 'dropzone';
interface FileEventTarget {
    target: {
        files: FileList;
    };
}
type FileEvent = Event & FileEventTarget;
export declare class UploadFieldComponent extends FormitemComponent implements AfterViewInit {
    readonly valueAccessor: ValueAccessorDirective<FileList>;
    private configService;
    readonly label: import("@angular/core").InputSignal<string>;
    readonly name: import("@angular/core").InputSignal<string>;
    readonly required: import("@angular/core").ModelSignal<boolean>;
    readonly disabled: import("@angular/core").ModelSignal<boolean>;
    readonly variant: import("@angular/core").InputSignal<UploadFieldVariantType>;
    readonly btnLabel: import("@angular/core").InputSignal<string>;
    readonly dropzoneText: import("@angular/core").InputSignal<string>;
    readonly multiple: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly accept: import("@angular/core").InputSignal<string>;
    readonly toggletip: import("@angular/core").InputSignal<string>;
    readonly toggletipLabel: import("@angular/core").InputSignal<string>;
    readonly toggletipCloseLabel: import("@angular/core").InputSignal<string>;
    readonly toggletipTemplate: import("@angular/core").InputSignal<TemplateRef<unknown>>;
    readonly requiredSign: import("@angular/core").ModelSignal<string>;
    readonly requiredSignTitleAttr: import("@angular/core").InputSignal<string>;
    readonly optionalText: import("@angular/core").ModelSignal<string>;
    readonly visuallyHiddenLabel: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly input: import("@angular/core").Signal<ElementRef<any>>;
    readonly wrapper: import("@angular/core").Signal<ElementRef<any>>;
    protected externalId: string;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    protected get containerCssClasses(): string;
    protected get wrapperClass(): string;
    protected get describedBy(): string | null;
    protected onFocusout(event: FocusEvent): void;
    /** @internal */
    ngAfterViewInit(): void;
    protected fileChange(event: Event | FileEvent): void;
    protected fileCancel(event: Event | FileEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UploadFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UploadFieldComponent, "drv-uploadfield", never, { "label": { "alias": "label"; "required": true; "isSignal": true; }; "name": { "alias": "name"; "required": false; "isSignal": true; }; "required": { "alias": "required"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "btnLabel": { "alias": "btnLabel"; "required": false; "isSignal": true; }; "dropzoneText": { "alias": "dropzoneText"; "required": false; "isSignal": true; }; "multiple": { "alias": "multiple"; "required": false; "isSignal": true; }; "accept": { "alias": "accept"; "required": false; "isSignal": true; }; "toggletip": { "alias": "toggletip"; "required": false; "isSignal": true; }; "toggletipLabel": { "alias": "toggletipLabel"; "required": false; "isSignal": true; }; "toggletipCloseLabel": { "alias": "toggletipCloseLabel"; "required": false; "isSignal": true; }; "toggletipTemplate": { "alias": "toggletipTemplate"; "required": false; "isSignal": true; }; "requiredSign": { "alias": "requiredSign"; "required": false; "isSignal": true; }; "requiredSignTitleAttr": { "alias": "requiredSignTitleAttr"; "required": false; "isSignal": true; }; "optionalText": { "alias": "optionalText"; "required": false; "isSignal": true; }; "visuallyHiddenLabel": { "alias": "visuallyHiddenLabel"; "required": false; "isSignal": true; }; }, { "required": "requiredChange"; "disabled": "disabledChange"; "requiredSign": "requiredSignChange"; "optionalText": "optionalTextChange"; }, never, never, true, [{ directive: typeof i1.ValueAccessorDirective; inputs: {}; outputs: {}; }]>;
}
export {};
