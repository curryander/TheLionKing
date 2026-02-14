import { ElementRef } from '@angular/core';
import { ValueAccessorDirective } from '../../directives/valueaccessor.directive';
import { BackgroundUI } from '../../types';
import * as i0 from "@angular/core";
import * as i1 from "../../directives/valueaccessor.directive";
export interface ToggleChange {
    source: ToggleComponent;
    value: boolean;
}
export type ToggleLayout = 'block' | 'inline';
export type ToggleLabelStyle = 'bold' | 'normal';
export declare class ToggleComponent {
    readonly valueAccessor: ValueAccessorDirective<boolean>;
    readonly id: import("@angular/core").InputSignal<string>;
    readonly externalLabelId: import("@angular/core").InputSignal<string>;
    readonly name: import("@angular/core").InputSignal<string>;
    readonly disabled: import("@angular/core").ModelSignal<boolean>;
    readonly value: import("@angular/core").InputSignal<string>;
    readonly label: import("@angular/core").InputSignal<string>;
    readonly labelHidden: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly backgroundUI: import("@angular/core").InputSignal<BackgroundUI>;
    readonly layout: import("@angular/core").InputSignal<ToggleLayout>;
    readonly labelStyle: import("@angular/core").InputSignal<ToggleLabelStyle>;
    readonly toggleStateOff: import("@angular/core").InputSignal<string>;
    readonly toggleStateOn: import("@angular/core").InputSignal<string>;
    readonly input: import("@angular/core").Signal<ElementRef<HTMLInputElement>>;
    readonly toggled: import("@angular/core").OutputEmitterRef<ToggleChange>;
    protected externalId: string;
    protected hostClass: string;
    private innerValue?;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    protected get title(): string;
    protected get containerCssClasses(): string;
    protected get labelClasses(): string;
    get model(): boolean;
    set model(value: boolean);
    protected onFocusout(event: FocusEvent): void;
    protected nativeChange(e: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToggleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ToggleComponent, "drv-toggle", never, { "id": { "alias": "id"; "required": false; "isSignal": true; }; "externalLabelId": { "alias": "externalLabelId"; "required": false; "isSignal": true; }; "name": { "alias": "name"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": true; "isSignal": true; }; "labelHidden": { "alias": "labelHidden"; "required": false; "isSignal": true; }; "backgroundUI": { "alias": "backgroundUI"; "required": false; "isSignal": true; }; "layout": { "alias": "layout"; "required": false; "isSignal": true; }; "labelStyle": { "alias": "labelStyle"; "required": false; "isSignal": true; }; "toggleStateOff": { "alias": "toggleStateOff"; "required": false; "isSignal": true; }; "toggleStateOn": { "alias": "toggleStateOn"; "required": false; "isSignal": true; }; }, { "disabled": "disabledChange"; "toggled": "toggled"; }, never, never, true, [{ directive: typeof i1.ValueAccessorDirective; inputs: {}; outputs: {}; }]>;
}
