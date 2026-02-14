import { NavigationExtras } from '@angular/router';
import type { IconType } from './icons';
import type { Route } from '@angular/router';
export interface NavigationItemAction {
    label: string;
    icon?: IconType;
    callbackFn?: () => void;
    route?: Route[] | string[];
    routeExtras?: NavigationExtras;
}
export interface NavigationItem {
    text: string;
    icon?: IconType;
    href?: string;
    target?: '_self' | '_blank' | '_parent' | '_top';
    route?: Route[] | string[];
    routeExtras?: NavigationExtras;
    callbackFn?: () => void;
    badgeNumber?: number;
    active?: boolean;
    actions?: NavigationItemAction[];
}
