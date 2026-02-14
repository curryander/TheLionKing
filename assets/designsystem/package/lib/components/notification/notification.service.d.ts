import { PortalContentType } from '../../types';
import * as i0 from "@angular/core";
export type NotificationVariant = 'alert' | 'warning' | 'success' | 'info';
export interface Notification {
    id?: string;
    variant: NotificationVariant;
    title: string;
    text?: string;
    portalContent?: PortalContentType;
    isRemoveAble?: boolean;
    needsFeedback?: boolean;
    duration?: number;
    scrOnly?: boolean;
}
interface LocalNotification extends Notification {
    notificationId?: string;
}
export declare class NotificationService {
    private _notifications;
    private _removals;
    private _announcer;
    readonly notifications: import("rxjs").Observable<LocalNotification[]>;
    readonly removals: import("rxjs").Observable<string[]>;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    update(data: LocalNotification): void;
    remove(id: string): void;
    clear(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NotificationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NotificationService>;
}
export {};
