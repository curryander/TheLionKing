import { InjectionToken } from '@angular/core';
import { type BackgroundUIDarkColor } from '../types';
import { type NotificationToastPosition } from '../components/notification/notification.component';
import { type ApplicationHeaderLayout } from '../components/applicationheader/applicationheader.component';
import * as i0 from "@angular/core";
interface AppConfig {
    spritePath: string;
    pictogramSpritePath: string;
    formsRequiredDefault: boolean;
    formsRequiredDefaultSign: string;
    formsOptionalDefaultText: string;
    theadDefaultBackgroundUI: BackgroundUIDarkColor;
    progressnavDefaultDisabled: boolean;
    notificationDefaultToastPosition: NotificationToastPosition;
    applicationHeaderDefaultLayout: ApplicationHeaderLayout;
    showKeyboardshortCutAsTooltip: boolean;
    reducedMotion: boolean;
    useTheme: boolean;
    themePath?: string;
    symbolsPath: string;
}
declare const CONFIG_TOKEN: InjectionToken<Partial<AppConfig>>;
declare const DEFAULT_CONFIG_PUBLIC: AppConfig;
declare const DEFAULT_CONFIG_PRODUCTIVE: AppConfig;
/**
 * Library users can provide a partial app configuration object, this service will
 * handle merging the partial configuration with a default configuration.
 */
export declare class ConfigService {
    private customConfig;
    private _config;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    get config(): AppConfig;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfigService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfigService>;
}
export { AppConfig, CONFIG_TOKEN, DEFAULT_CONFIG_PRODUCTIVE, DEFAULT_CONFIG_PUBLIC };
