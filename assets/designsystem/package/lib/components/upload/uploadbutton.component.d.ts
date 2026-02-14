import { ElementRef } from '@angular/core';
import { FormitemComponent } from '../formitem/formitem.component';
import { ValueAccessorDirective } from '../../directives/valueaccessor.directive';
import * as i0 from "@angular/core";
import * as i1 from "../../directives/valueaccessor.directive";
interface FileEventTarget {
    target: {
        files: FileList;
    };
}
type FileEvent = Event & FileEventTarget;
export declare class UploadButtonComponent extends FormitemComponent {
    readonly valueAccessor: ValueAccessorDirective<FileList>;
    readonly required: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly disabled: import("@angular/core").ModelSignal<boolean>;
    readonly label: import("@angular/core").InputSignal<string>;
    readonly multiple: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly accept: import("@angular/core").InputSignal<string>;
    readonly input: import("@angular/core").Signal<ElementRef<any>>;
    protected externalId: string;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    protected get containerCssClasses(): string;
    protected get wrapperClass(): string;
    protected get describedBy(): string | null;
    protected onFocusout(event: FocusEvent): void;
    protected fileChange(event: Event | FileEvent): void;
    protected fileCancel(event: Event | FileEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UploadButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UploadButtonComponent, "drv-upload", never, { "required": { "alias": "required"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": true; "isSignal": true; }; "multiple": { "alias": "multiple"; "required": false; "isSignal": true; }; "accept": { "alias": "accept"; "required": false; "isSignal": true; }; }, { "disabled": "disabledChange"; }, never, never, true, [{ directive: typeof i1.ValueAccessorDirective; inputs: {}; outputs: {}; }]>;
}
export {};
