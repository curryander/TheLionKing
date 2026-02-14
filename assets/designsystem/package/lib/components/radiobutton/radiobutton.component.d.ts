import { OnChanges, SimpleChanges, ElementRef, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { AriaAttributes, BackgroundUI } from '../../types';
import * as i0 from "@angular/core";
export interface RadioChange {
    source: RadiobuttonComponent;
    value: string | number;
}
export declare class RadiobuttonComponent implements OnChanges, OnInit, OnDestroy {
    private parent;
    private inputGroupService;
    private changeDetector;
    private configService;
    readonly id: import("@angular/core").InputSignal<string>;
    readonly name: import("@angular/core").ModelSignal<string>;
    readonly value: import("@angular/core").InputSignal<string | number>;
    readonly disabled: import("@angular/core").ModelSignal<boolean>;
    readonly required: import("@angular/core").ModelSignal<boolean>;
    readonly backgroundUI: import("@angular/core").ModelSignal<BackgroundUI>;
    readonly ariaAttributes: import("@angular/core").ModelSignal<AriaAttributes>;
    readonly input: import("@angular/core").Signal<ElementRef<any>>;
    readonly valueChange: import("@angular/core").OutputEmitterRef<RadioChange>;
    /** @internal */
    readonly enabled: EventEmitter<RadiobuttonComponent>;
    protected externalId: string;
    protected checked: boolean;
    private destroyed$;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    get containerCssClasses(): string;
    /** @internal */
    ngOnInit(): void;
    /**
     * @param {SimpleChanges} changes SimpleChanges
     * @internal
     */
    ngOnChanges(changes: SimpleChanges): void;
    /** @internal */
    ngOnDestroy(): void;
    protected onInputInteraction(event: Event): void;
    protected onInputClick(event: Event): void;
    private setAriaAttributes;
    static ɵfac: i0.ɵɵFactoryDeclaration<RadiobuttonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RadiobuttonComponent, "drv-radiobutton", never, { "id": { "alias": "id"; "required": false; "isSignal": true; }; "name": { "alias": "name"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "required": { "alias": "required"; "required": false; "isSignal": true; }; "backgroundUI": { "alias": "backgroundUI"; "required": false; "isSignal": true; }; "ariaAttributes": { "alias": "ariaAttributes"; "required": false; "isSignal": true; }; }, { "name": "nameChange"; "disabled": "disabledChange"; "required": "requiredChange"; "backgroundUI": "backgroundUIChange"; "ariaAttributes": "ariaAttributesChange"; "valueChange": "valueChange"; "enabled": "enabled"; }, never, ["*"], true, never>;
}
