import { ElementRef, OnInit, AfterViewInit, OnDestroy, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class AccordionItemComponent implements OnInit, AfterViewInit, OnDestroy {
    isOpen: boolean;
    private router;
    private activatedRoute;
    private changeDetector;
    /** @internal */
    readonly detailsElement: import("@angular/core").Signal<ElementRef<any>>;
    readonly message: import("@angular/core").InputSignal<string>;
    readonly title: import("@angular/core").InputSignal<string>;
    readonly iconType: import("@angular/core").InputSignal<"status-processing" | "status-success" | "status-warning">;
    readonly itemId: import("@angular/core").InputSignal<string>;
    toggled: EventEmitter<AccordionItemComponent>;
    private routerSubscription;
    protected get open(): boolean | null;
    /** @internal */
    markForCheck(): void;
    /** @internal */
    ngOnInit(): void;
    /** @internal */
    ngAfterViewInit(): void;
    /** @internal */
    ngOnDestroy(): void;
    /**
     * @param {string} hash URL-Hash
     * @internal
     */
    toggleFromHash(hash: string): void;
    protected emitToggle(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AccordionItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AccordionItemComponent, "drv-accordionitem", never, { "isOpen": { "alias": "isOpen"; "required": false; }; "message": { "alias": "message"; "required": false; "isSignal": true; }; "title": { "alias": "title"; "required": false; "isSignal": true; }; "iconType": { "alias": "iconType"; "required": false; "isSignal": true; }; "itemId": { "alias": "itemId"; "required": false; "isSignal": true; }; }, { "toggled": "toggled"; }, never, ["*"], true, never>;
    static ngAcceptInputType_isOpen: unknown;
}
