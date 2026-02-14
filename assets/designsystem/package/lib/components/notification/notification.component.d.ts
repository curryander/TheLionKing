import { OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Notification } from './notification.service';
import type { SymbolsType } from '../../types/symbols';
import type { NotificationVariant } from './notification.service';
import { ButtonComponent } from '../button/button.component';
import * as i0 from "@angular/core";
interface LocalNotification extends Notification {
    notificationId?: string;
}
export type NotificationType = 'toast' | 'inline' | 'banner';
export type NotificationToastPosition = 'bottom' | 'right';
export declare class NotificationComponent implements OnInit, OnChanges {
    private notificationService;
    private configService;
    readonly notificationId: import("@angular/core").InputSignal<string>;
    readonly type: import("@angular/core").ModelSignal<NotificationType>;
    readonly collapsible: import("@angular/core").InputSignal<boolean>;
    readonly inlineNotification: import("@angular/core").InputSignal<Notification>;
    readonly toastPosition: import("@angular/core").ModelSignal<NotificationToastPosition>;
    readonly closeButtonLabel: import("@angular/core").InputSignal<string>;
    readonly toggleButtonLabel: import("@angular/core").InputSignal<string>;
    readonly notificationClosed: import("@angular/core").OutputEmitterRef<string>;
    readonly buttons: import("@angular/core").Signal<readonly ButtonComponent[]>;
    protected hostClass: string;
    protected notifications: LocalNotification[];
    protected trackByFn: (index: number) => number;
    protected isOpen: boolean;
    private activeElement;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    protected get cssClass(): string;
    protected get ariaLive(): string;
    protected get isCollapsible(): boolean;
    protected keydownHandler(e: KeyboardEvent): void;
    /** @internal */
    ngOnInit(): void;
    /**
     * @param {SimpleChanges} changes SimpleChanges
     * @internal
     */
    ngOnChanges(changes: SimpleChanges): void;
    protected getIconType(variant: NotificationVariant): SymbolsType;
    protected isRemovable({ isRemoveAble }: {
        isRemoveAble?: boolean;
    }): boolean;
    protected getStyle({ needsFeedback, duration, variant }: {
        needsFeedback?: boolean;
        duration?: number;
        variant: any;
    }): string | null;
    protected removeNotification(e: AnimationEvent | MouseEvent, id: string): void;
    protected toggle(): void;
    private selector;
    private hasRemovableAlert;
    private removableAlertCount;
    private focusFirstButton;
    private addActiveElement;
    static ɵfac: i0.ɵɵFactoryDeclaration<NotificationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NotificationComponent, "drv-notification", never, { "notificationId": { "alias": "notificationId"; "required": false; "isSignal": true; }; "type": { "alias": "type"; "required": false; "isSignal": true; }; "collapsible": { "alias": "collapsible"; "required": false; "isSignal": true; }; "inlineNotification": { "alias": "inlineNotification"; "required": false; "isSignal": true; }; "toastPosition": { "alias": "toastPosition"; "required": false; "isSignal": true; }; "closeButtonLabel": { "alias": "closeButtonLabel"; "required": false; "isSignal": true; }; "toggleButtonLabel": { "alias": "toggleButtonLabel"; "required": false; "isSignal": true; }; }, { "type": "typeChange"; "toastPosition": "toastPositionChange"; "notificationClosed": "notificationClosed"; }, never, never, true, never>;
}
export {};
