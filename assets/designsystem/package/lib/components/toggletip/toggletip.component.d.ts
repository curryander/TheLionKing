import { AfterViewInit, ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ToggletipComponent implements AfterViewInit {
    private elementRef;
    readonly btnTriggerLabel: import("@angular/core").InputSignal<string>;
    readonly btnCloseLabel: import("@angular/core").InputSignal<string>;
    readonly toggletipContent: import("@angular/core").Signal<ElementRef<HTMLElement>>;
    readonly toggletip: import("@angular/core").Signal<ElementRef<HTMLElement>>;
    protected visible: boolean;
    protected handleWindowClick(target: HTMLElement): void;
    /** @internal */
    ngAfterViewInit(): void;
    protected toggle(): void;
    private checkContentBox;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToggletipComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ToggletipComponent, "drv-toggletip", never, { "btnTriggerLabel": { "alias": "btnTriggerLabel"; "required": false; "isSignal": true; }; "btnCloseLabel": { "alias": "btnCloseLabel"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}
