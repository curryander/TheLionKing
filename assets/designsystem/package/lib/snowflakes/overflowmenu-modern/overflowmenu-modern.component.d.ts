import { ElementRef, AfterContentInit } from '@angular/core';
import type { IconType } from '../../types/icons';
import { ButtonComponent, type IconOnlyType, type IconPositionType } from '../../components/button/button.component';
import type { OverflowmenuBtnVariant, OverflowmenuPlacing } from '../../components/overflowmenu/overflowmenu.component';
import * as i0 from "@angular/core";
export declare class OverflowmenuModernComponent implements AfterContentInit {
    readonly id: import("@angular/core").InputSignal<string>;
    readonly placing: import("@angular/core").InputSignal<OverflowmenuPlacing>;
    readonly triggerButtonLabel: import("@angular/core").InputSignal<string>;
    readonly triggerButtonVariant: import("@angular/core").InputSignal<OverflowmenuBtnVariant>;
    readonly triggerButtonIcon: import("@angular/core").InputSignal<IconType>;
    readonly triggerButtonIconOnly: import("@angular/core").InputSignal<IconOnlyType>;
    readonly triggerButtonIconPosition: import("@angular/core").InputSignal<IconPositionType>;
    /** @internal */
    readonly buttons: import("@angular/core").Signal<readonly ButtonComponent[]>;
    /** @internal */
    readonly toggleButton: import("@angular/core").Signal<ElementRef<any>>;
    /** @internal */
    readonly menuContent: import("@angular/core").Signal<ElementRef<HTMLElement>>;
    protected isOpen: boolean;
    protected trackByFn: (index: number) => number;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    /** @internal */
    ngAfterContentInit(): void;
    protected toggle(event: Event): void;
    private calculatePosition;
    static ɵfac: i0.ɵɵFactoryDeclaration<OverflowmenuModernComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OverflowmenuModernComponent, "drv-overflowmenu-modern", never, { "id": { "alias": "id"; "required": false; "isSignal": true; }; "placing": { "alias": "placing"; "required": false; "isSignal": true; }; "triggerButtonLabel": { "alias": "triggerButtonLabel"; "required": true; "isSignal": true; }; "triggerButtonVariant": { "alias": "triggerButtonVariant"; "required": false; "isSignal": true; }; "triggerButtonIcon": { "alias": "triggerButtonIcon"; "required": false; "isSignal": true; }; "triggerButtonIconOnly": { "alias": "triggerButtonIconOnly"; "required": false; "isSignal": true; }; "triggerButtonIconPosition": { "alias": "triggerButtonIconPosition"; "required": false; "isSignal": true; }; }, {}, ["buttons"], never, true, never>;
}
