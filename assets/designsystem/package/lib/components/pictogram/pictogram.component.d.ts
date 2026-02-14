import { OnChanges, OnInit } from '@angular/core';
import { PictogramsType } from '../../types/pictograms';
import * as i0 from "@angular/core";
export { type PictogramsType };
export declare class PictogramComponent implements OnInit, OnChanges {
    private configService;
    readonly label: import("@angular/core").InputSignal<string>;
    readonly type: import("@angular/core").InputSignal<PictogramsType>;
    readonly size: import("@angular/core").InputSignalWithTransform<number, unknown>;
    readonly ariaHidden: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    protected svgSrc: string;
    protected pictogramSpritePath: string;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<PictogramComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PictogramComponent, "drv-pictogram", never, { "label": { "alias": "label"; "required": false; "isSignal": true; }; "type": { "alias": "type"; "required": true; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "ariaHidden": { "alias": "ariaHidden"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
