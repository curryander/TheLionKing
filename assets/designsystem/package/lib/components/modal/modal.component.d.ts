import { OnDestroy, AfterViewInit, OnInit } from '@angular/core';
import { ButtonComponent, type IconOnlyType } from '../button/button.component';
import { type ModalRole } from './modal.service';
import * as i0 from "@angular/core";
export declare class ModalContentDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalContentDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ModalContentDirective, "drv-modal-content", never, {}, {}, never, never, true, never>;
}
export declare class ModalActionsDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalActionsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ModalActionsDirective, "drv-modal-actions", never, {}, {}, never, never, true, never>;
}
export declare class ModalComponent implements OnDestroy, AfterViewInit, OnInit {
    private modalService;
    private elementRef;
    readonly modalTitle: import("@angular/core").InputSignal<string>;
    readonly closeButtonLabel: import("@angular/core").InputSignal<string>;
    readonly closeButtonIconOnlyType: import("@angular/core").InputSignal<IconOnlyType>;
    readonly hideCloseButton: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly closed: import("@angular/core").OutputEmitterRef<void>;
    readonly open: import("@angular/core").OutputEmitterRef<void>;
    readonly button: import("@angular/core").Signal<ButtonComponent>;
    readonly role: import("@angular/core").InputSignal<ModalRole>;
    readonly modalId: import("@angular/core").InputSignal<string>;
    private undo;
    private dialog;
    private subscription;
    protected get modalTitleId(): string | undefined;
    protected get hideButton(): boolean;
    /** @internal */
    ngOnInit(): void;
    /** @internal */
    ngAfterViewInit(): void;
    /** @internal */
    ngOnDestroy(): void;
    private subscribeToModals;
    private toggleDialog;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModalComponent, "drv-modal", never, { "modalTitle": { "alias": "modalTitle"; "required": false; "isSignal": true; }; "closeButtonLabel": { "alias": "closeButtonLabel"; "required": false; "isSignal": true; }; "closeButtonIconOnlyType": { "alias": "closeButtonIconOnlyType"; "required": false; "isSignal": true; }; "hideCloseButton": { "alias": "hideCloseButton"; "required": false; "isSignal": true; }; "role": { "alias": "role"; "required": false; "isSignal": true; }; "modalId": { "alias": "modalId"; "required": true; "isSignal": true; }; }, { "closed": "closed"; "open": "open"; }, never, ["drv-modal-content", "drv-modal-actions"], true, never>;
}
