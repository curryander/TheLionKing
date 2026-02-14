import { ElementRef, AfterViewInit, AfterContentInit, QueryList } from '@angular/core';
import type { BackgroundUI } from '../../types';
import { TabpanelComponent } from './tabpanel.component';
import * as i0 from "@angular/core";
export interface TabChange {
    to: number;
    from: number;
}
export declare class TablistComponent implements AfterViewInit, AfterContentInit {
    readonly backgroundUI: import("@angular/core").InputSignal<BackgroundUI>;
    readonly paddedContent: import("@angular/core").InputSignal<boolean>;
    readonly tabChange: import("@angular/core").OutputEmitterRef<TabChange>;
    protected panels: QueryList<TabpanelComponent>;
    protected sections: QueryList<ElementRef>;
    /** @internal */
    readonly tabs: import("@angular/core").Signal<readonly ElementRef<any>[]>;
    /** @internal */
    readonly items: import("@angular/core").Signal<readonly ElementRef<any>[]>;
    /** @internal */
    readonly list: import("@angular/core").Signal<ElementRef<any>>;
    protected id: string;
    protected trackByFn: (index: number) => number;
    private scrollLeft;
    private maxScrollLeft;
    private isOverflowing;
    private intersections;
    constructor();
    protected get prevButtonClass(): string;
    protected get nextButtonClass(): string;
    protected get maskOpacity(): string;
    /** @internal */
    ngAfterContentInit(): void;
    /** @internal */
    ngAfterViewInit(): void;
    protected setActive(index: number, focus?: boolean): void;
    protected handleClick(e: Event, panel: TabpanelComponent, index: number): void;
    protected handleNavButtonClick(direction: 'left' | 'right'): void;
    protected handleKeyDown(event: KeyboardEvent, index: number): void;
    protected handleScroll(event: Event): void;
    private setFirstPanelActive;
    static ɵfac: i0.ɵɵFactoryDeclaration<TablistComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TablistComponent, "drv-tablist", never, { "backgroundUI": { "alias": "backgroundUI"; "required": false; "isSignal": true; }; "paddedContent": { "alias": "paddedContent"; "required": false; "isSignal": true; }; }, { "tabChange": "tabChange"; }, ["panels"], never, true, never>;
}
