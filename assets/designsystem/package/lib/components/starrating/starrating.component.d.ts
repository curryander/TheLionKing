import { QueryList, ElementRef, OnChanges } from '@angular/core';
import { ValueAccessorDirective } from '../../directives/valueaccessor.directive';
import { ConfigService } from '../../services/config.service';
import { type AriaAttributes, type BackgroundUI } from '../../types';
import { type FormItemMessage } from '../formitem/formitem.component';
import * as i0 from "@angular/core";
import * as i1 from "../../directives/valueaccessor.directive";
export declare class StarRatingComponent implements OnChanges {
    /** @internal */
    readonly valueAccessor: ValueAccessorDirective<number>;
    private configService;
    readonly id: import("@angular/core").InputSignal<string>;
    readonly grouplabel: import("@angular/core").InputSignal<string>;
    readonly requiredSign: import("@angular/core").ModelSignal<string>;
    readonly requiredSignTitleAttr: import("@angular/core").InputSignal<string>;
    readonly optionalText: import("@angular/core").ModelSignal<string>;
    readonly hasError: import("@angular/core").ModelSignal<boolean>;
    readonly errorText: import("@angular/core").ModelSignal<FormItemMessage[]>;
    readonly errorPrefix: import("@angular/core").InputSignal<string>;
    readonly hasInfo: import("@angular/core").ModelSignal<boolean>;
    readonly infoText: import("@angular/core").ModelSignal<FormItemMessage[]>;
    readonly infoPrefix: import("@angular/core").InputSignal<string>;
    readonly hasWarning: import("@angular/core").ModelSignal<boolean>;
    readonly warningText: import("@angular/core").ModelSignal<FormItemMessage[]>;
    readonly warningPrefix: import("@angular/core").InputSignal<string>;
    readonly disabled: import("@angular/core").ModelSignal<boolean>;
    readonly collapseMessages: import("@angular/core").ModelSignal<boolean>;
    readonly backgroundUI: import("@angular/core").InputSignal<BackgroundUI>;
    readonly announceChanges: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly required: import("@angular/core").ModelSignal<unknown>;
    readonly visuallyHiddenLabel: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly starText: import("@angular/core").InputSignal<string>;
    /** @internal */ _radios: QueryList<ElementRef>;
    protected ratingOptions: number[];
    protected rating: number;
    protected trackByFn: (index: number) => number;
    protected ariaAttributes: AriaAttributes;
    private labelClicked;
    constructor(
    /** @internal */
    valueAccessor: ValueAccessorDirective<number>, configService: ConfigService);
    get cssClasses(): string[];
    get value(): number;
    set value(value: number);
    /** @internal */
    ngOnChanges(): void;
    protected setRating(value: number): void;
    protected onFocusout(event: FocusEvent): void;
    protected onFocusIn(e: FocusEvent): void;
    protected labelClick({ target }: {
        target: any;
    }): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<StarRatingComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StarRatingComponent, "drv-starrating", never, { "id": { "alias": "id"; "required": false; "isSignal": true; }; "grouplabel": { "alias": "grouplabel"; "required": false; "isSignal": true; }; "requiredSign": { "alias": "requiredSign"; "required": false; "isSignal": true; }; "requiredSignTitleAttr": { "alias": "requiredSignTitleAttr"; "required": false; "isSignal": true; }; "optionalText": { "alias": "optionalText"; "required": false; "isSignal": true; }; "hasError": { "alias": "hasError"; "required": false; "isSignal": true; }; "errorText": { "alias": "errorText"; "required": false; "isSignal": true; }; "errorPrefix": { "alias": "errorPrefix"; "required": false; "isSignal": true; }; "hasInfo": { "alias": "hasInfo"; "required": false; "isSignal": true; }; "infoText": { "alias": "infoText"; "required": false; "isSignal": true; }; "infoPrefix": { "alias": "infoPrefix"; "required": false; "isSignal": true; }; "hasWarning": { "alias": "hasWarning"; "required": false; "isSignal": true; }; "warningText": { "alias": "warningText"; "required": false; "isSignal": true; }; "warningPrefix": { "alias": "warningPrefix"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "collapseMessages": { "alias": "collapseMessages"; "required": false; "isSignal": true; }; "backgroundUI": { "alias": "backgroundUI"; "required": false; "isSignal": true; }; "announceChanges": { "alias": "announceChanges"; "required": false; "isSignal": true; }; "required": { "alias": "required"; "required": false; "isSignal": true; }; "visuallyHiddenLabel": { "alias": "visuallyHiddenLabel"; "required": false; "isSignal": true; }; "starText": { "alias": "starText"; "required": false; "isSignal": true; }; }, { "requiredSign": "requiredSignChange"; "optionalText": "optionalTextChange"; "hasError": "hasErrorChange"; "errorText": "errorTextChange"; "hasInfo": "hasInfoChange"; "infoText": "infoTextChange"; "hasWarning": "hasWarningChange"; "warningText": "warningTextChange"; "disabled": "disabledChange"; "collapseMessages": "collapseMessagesChange"; "required": "requiredChange"; }, never, never, true, [{ directive: typeof i1.ValueAccessorDirective; inputs: {}; outputs: {}; }]>;
}
