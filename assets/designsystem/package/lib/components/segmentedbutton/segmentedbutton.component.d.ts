import { AfterContentInit, OnChanges, SimpleChanges } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import * as i0 from "@angular/core";
export declare class SegmentedButtonComponent implements AfterContentInit, OnChanges {
    readonly activeIndex: import("@angular/core").InputSignalWithTransform<number, unknown>;
    readonly buttonClick: import("@angular/core").OutputEmitterRef<number>;
    readonly _buttons: import("@angular/core").Signal<readonly any[]>;
    private selectedIndex;
    private buttonArr;
    /** @internal */
    ngAfterContentInit(): void;
    /**
     * @param {SimpleChanges} changes SimpleChanges
     * @internal
     */
    ngOnChanges(changes: SimpleChanges): void;
    protected clickHandler(button: ButtonComponent): () => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SegmentedButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SegmentedButtonComponent, "drv-segmentedbutton", never, { "activeIndex": { "alias": "activeIndex"; "required": false; "isSignal": true; }; }, { "buttonClick": "buttonClick"; }, ["_buttons"], ["*"], true, never>;
}
