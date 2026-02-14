import { ChangeDetectorRef, ElementRef, OnChanges, SimpleChanges, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ValueAccessorDirective } from '../../directives/valueaccessor.directive';
import type { AriaAttributes, BackgroundUI } from '../../types';
import * as i0 from "@angular/core";
import * as i1 from "../../directives/valueaccessor.directive";
export interface CheckboxChange {
    source: CheckboxComponent;
    value: string | number | unknown;
}
export declare class CheckboxComponent implements OnChanges, OnInit, OnDestroy {
    private parent;
    private inputGroupService;
    readonly changeDetector: ChangeDetectorRef;
    readonly elementRef: ElementRef<any>;
    readonly valueAccessor: ValueAccessorDirective<unknown>;
    readonly id: import("@angular/core").InputSignal<string>;
    readonly name: import("@angular/core").ModelSignal<string>;
    readonly disabled: import("@angular/core").ModelSignal<boolean>;
    readonly required: import("@angular/core").ModelSignal<boolean>;
    readonly value: import("@angular/core").InputSignal<string>;
    readonly labelHidden: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly backgroundUI: import("@angular/core").ModelSignal<BackgroundUI>;
    readonly ariaAttributes: import("@angular/core").ModelSignal<AriaAttributes>;
    readonly input: import("@angular/core").Signal<ElementRef<any>>;
    readonly checkboxChange: import("@angular/core").OutputEmitterRef<CheckboxChange>;
    /** @internal */
    readonly rendered: import("@angular/core").OutputEmitterRef<void>;
    /** @internal */
    readonly enabled: EventEmitter<CheckboxComponent>;
    /** @internal */
    externalId: string;
    private innerValue?;
    private labelClicked;
    private destroyed$;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    protected get title(): string;
    protected get containerCssClasses(): string;
    get labelClasses(): string;
    set checked(value: boolean);
    get model(): unknown;
    set model(value: unknown);
    protected onFocusout(event: FocusEvent): void;
    /** @internal */
    ngOnInit(): void;
    /**
     * @param {SimpleChanges} changes SimpleChanges
     * @internal
     */
    ngOnChanges(changes: SimpleChanges): void;
    /** @internal */
    ngOnDestroy(): void;
    protected focusHandler({ target }: {
        target: any;
    }): void;
    protected labelClick(): void;
    private setAriaAttributes;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckboxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CheckboxComponent, "drv-checkbox", never, { "id": { "alias": "id"; "required": false; "isSignal": true; }; "name": { "alias": "name"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "required": { "alias": "required"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": false; "isSignal": true; }; "labelHidden": { "alias": "labelHidden"; "required": false; "isSignal": true; }; "backgroundUI": { "alias": "backgroundUI"; "required": false; "isSignal": true; }; "ariaAttributes": { "alias": "ariaAttributes"; "required": false; "isSignal": true; }; "checked": { "alias": "checked"; "required": false; }; }, { "name": "nameChange"; "disabled": "disabledChange"; "required": "requiredChange"; "backgroundUI": "backgroundUIChange"; "ariaAttributes": "ariaAttributesChange"; "checkboxChange": "checkboxChange"; "rendered": "rendered"; "enabled": "enabled"; }, never, ["*"], true, [{ directive: typeof i1.ValueAccessorDirective; inputs: {}; outputs: {}; }]>;
}
