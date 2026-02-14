import { OnDestroy, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
export type ChartSize = 'small' | 'medium' | 'large';
export declare class DonutComponent implements OnInit, OnDestroy, AfterViewInit {
    readonly accessibleText: import("@angular/core").InputSignal<string>;
    readonly percent: import("@angular/core").ModelSignal<number>;
    readonly label: import("@angular/core").InputSignal<string>;
    readonly animated: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly type: import("@angular/core").InputSignal<ChartSize>;
    readonly outline: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly svg: import("@angular/core").Signal<ElementRef<any>>;
    protected size: number;
    protected strokeWidth: number;
    protected radius: number;
    protected innerRadius: number;
    protected innerRadiusSmall: number;
    protected labelId: string;
    protected reducedMotion: boolean;
    protected calculatedPercent: number;
    protected observer: IntersectionObserver;
    private startTime;
    private duration;
    protected get viewBox(): string;
    protected get getPath(): string;
    /** @internal */
    ngOnInit(): void;
    /** @internal */
    ngAfterViewInit(): void;
    /** @internal */
    ngOnDestroy(): void;
    private draw;
    private getPathFromAngle;
    static ɵfac: i0.ɵɵFactoryDeclaration<DonutComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DonutComponent, "drv-donut", never, { "accessibleText": { "alias": "accessibleText"; "required": true; "isSignal": true; }; "percent": { "alias": "percent"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; "animated": { "alias": "animated"; "required": false; "isSignal": true; }; "type": { "alias": "type"; "required": false; "isSignal": true; }; "outline": { "alias": "outline"; "required": false; "isSignal": true; }; }, { "percent": "percentChange"; }, never, never, true, never>;
}
