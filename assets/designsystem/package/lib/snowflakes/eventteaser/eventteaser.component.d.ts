import type { IconType } from '../../types/icons';
import * as i0 from "@angular/core";
export interface EventInfo {
    icon: IconType;
    text: string;
}
export declare class EventteaserComponent {
    private document;
    readonly highlight: import("@angular/core").InputSignal<boolean>;
    readonly firstDate: import("@angular/core").InputSignal<Date>;
    readonly secondDate: import("@angular/core").InputSignal<Date>;
    readonly hint: import("@angular/core").InputSignal<string>;
    readonly warningPrefix: import("@angular/core").InputSignal<string>;
    readonly moreDates: import("@angular/core").InputSignal<string>;
    readonly nextEvent: import("@angular/core").InputSignal<string>;
    readonly title: import("@angular/core").InputSignal<string>;
    readonly link: import("@angular/core").InputSignal<string>;
    readonly infos: import("@angular/core").InputSignal<EventInfo[]>;
    hostTitle: any;
    protected trackByFn: (index: number) => number;
    get cssClass(): string;
    get ariaLabel(): string;
    get dateTimes(): string[];
    get displayDates(): string[];
    get locale(): string;
    private format;
    static ɵfac: i0.ɵɵFactoryDeclaration<EventteaserComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<EventteaserComponent, "drv-eventteaser", never, { "highlight": { "alias": "highlight"; "required": false; "isSignal": true; }; "firstDate": { "alias": "firstDate"; "required": false; "isSignal": true; }; "secondDate": { "alias": "secondDate"; "required": false; "isSignal": true; }; "hint": { "alias": "hint"; "required": false; "isSignal": true; }; "warningPrefix": { "alias": "warningPrefix"; "required": false; "isSignal": true; }; "moreDates": { "alias": "moreDates"; "required": false; "isSignal": true; }; "nextEvent": { "alias": "nextEvent"; "required": false; "isSignal": true; }; "title": { "alias": "title"; "required": false; "isSignal": true; }; "link": { "alias": "link"; "required": false; "isSignal": true; }; "infos": { "alias": "infos"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}
