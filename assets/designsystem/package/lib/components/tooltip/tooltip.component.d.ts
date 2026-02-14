import { OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export type PlacementType = 'top' | 'right' | 'left' | 'bottom' | 'top-start' | 'right-start' | 'left-start' | 'bottom-start' | 'top-end' | 'right-end' | 'left-end' | 'bottom-end';
export declare class TooltipComponent implements OnInit, OnDestroy, OnChanges {
    private title;
    private elRef;
    private renderer;
    readonly placement: import("@angular/core").InputSignal<PlacementType>;
    readonly tooltip: import("@angular/core").InputSignal<string>;
    readonly dynamic: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    private titleText;
    private tooltipElement;
    private toolTipOptions;
    private showTooltip;
    private hideTooltip;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    protected get tooltipText(): string;
    /** @internal */
    ngOnInit(): void;
    /**
     * @param {SimpleChanges} changes SimpleChanges
     * @internal
     */
    ngOnChanges(changes: SimpleChanges): void;
    /** @internal */
    ngOnDestroy(): void;
    private setup;
    private createTooltipElement;
    private mouseHandler;
    private bindEvents;
    private unbindEvents;
    static ɵfac: i0.ɵɵFactoryDeclaration<TooltipComponent, [{ attribute: "title"; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TooltipComponent, "[drv-tooltip]", never, { "placement": { "alias": "placement"; "required": false; "isSignal": true; }; "tooltip": { "alias": "tooltip"; "required": false; "isSignal": true; }; "dynamic": { "alias": "dynamic"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}
