import { OnChanges, OnInit } from '@angular/core';
import type { IconType } from '../../types/icons';
import type { PlacementType } from '../tooltip/tooltip.component';
import * as i0 from "@angular/core";
export { type IconType };
export declare class IconComponent implements OnInit, OnChanges {
    private configService;
    readonly type: import("@angular/core").InputSignal<IconType>;
    readonly label: import("@angular/core").InputSignal<string>;
    readonly size: import("@angular/core").InputSignalWithTransform<number, unknown>;
    readonly ariaHidden: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly tooltip: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly tooltipPosition: import("@angular/core").InputSignal<PlacementType>;
    protected svgSrc: string;
    protected iconSpritePath: string;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    protected get xLink(): string;
    protected classNames: string;
    protected get sizeInRem(): number;
    /** @internal */
    ngOnInit(): void;
    /** @internal */
    ngOnChanges(): void;
    private setSource;
    static ɵfac: i0.ɵɵFactoryDeclaration<IconComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IconComponent, "drv-icon", never, { "type": { "alias": "type"; "required": true; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "ariaHidden": { "alias": "ariaHidden"; "required": false; "isSignal": true; }; "tooltip": { "alias": "tooltip"; "required": false; "isSignal": true; }; "tooltipPosition": { "alias": "tooltipPosition"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
