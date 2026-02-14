import { OnDestroy, OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class LoadingComponent implements OnDestroy, OnInit {
    private loadingService;
    readonly loadingId: import("@angular/core").InputSignal<string>;
    readonly accessibleText: import("@angular/core").InputSignal<string>;
    readonly loadingText: import("@angular/core").InputSignal<string>;
    protected isBusy: boolean;
    protected asProgress: boolean;
    private progress;
    private subscription;
    protected get ariaBusy(): boolean;
    protected get cssClasses(): string;
    protected get loadingProgress(): string;
    protected get progressPercentage(): string;
    /** @internal */
    ngOnInit(): void;
    /** @internal */
    ngOnDestroy(): void;
    protected hide(e: AnimationEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LoadingComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LoadingComponent, "drv-loading", never, { "loadingId": { "alias": "loadingId"; "required": true; "isSignal": true; }; "accessibleText": { "alias": "accessibleText"; "required": false; "isSignal": true; }; "loadingText": { "alias": "loadingText"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
