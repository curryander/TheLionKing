import { OnDestroy, AfterViewInit, OnInit } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import * as i0 from "@angular/core";
export type SidepanelVariant = 'default' | 'modal';
export type SidepanelSize = 'xsmall' | 'small' | 'medium' | 'large';
export declare class SidepanelContentDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<SidepanelContentDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SidepanelContentDirective, "drv-sidepanel-content", never, {}, {}, never, never, true, never>;
}
export declare class SidepanelActionsDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<SidepanelActionsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SidepanelActionsDirective, "drv-sidepanel-actions", never, {}, {}, never, never, true, never>;
}
export declare class SidepanelComponent implements OnDestroy, AfterViewInit, OnInit {
    private modalService;
    private elementRef;
    readonly panelTitle: import("@angular/core").InputSignal<string>;
    readonly closeButtonLabel: import("@angular/core").InputSignal<string>;
    readonly hideCloseButton: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly panelSize: import("@angular/core").InputSignal<SidepanelSize>;
    readonly variant: import("@angular/core").InputSignal<SidepanelVariant>;
    readonly closed: import("@angular/core").OutputEmitterRef<void>;
    readonly open: import("@angular/core").OutputEmitterRef<void>;
    readonly panelId: import("@angular/core").InputSignal<string>;
    readonly button: import("@angular/core").Signal<ButtonComponent>;
    private dialog;
    private subscription;
    protected get panelTitleId(): string | undefined;
    /** @internal */
    ngOnInit(): void;
    /** @internal */
    ngAfterViewInit(): void;
    /** @internal */
    ngOnDestroy(): void;
    private subscribeToModals;
    private toggleDialog;
    static ɵfac: i0.ɵɵFactoryDeclaration<SidepanelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SidepanelComponent, "drv-sidepanel", never, { "panelTitle": { "alias": "panelTitle"; "required": false; "isSignal": true; }; "closeButtonLabel": { "alias": "closeButtonLabel"; "required": true; "isSignal": true; }; "hideCloseButton": { "alias": "hideCloseButton"; "required": false; "isSignal": true; }; "panelSize": { "alias": "panelSize"; "required": false; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "panelId": { "alias": "panelId"; "required": true; "isSignal": true; }; }, { "closed": "closed"; "open": "open"; }, never, ["drv-sidepanel-content", "drv-sidepanel-actions"], true, never>;
}
