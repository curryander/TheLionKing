import { OnDestroy } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
type OnChangeFunction = (v: unknown) => void;
type OnTouchedFunction = (v: boolean | FocusEvent) => void;
export declare class ValueAccessorDirective<T> implements ControlValueAccessor, OnDestroy {
    private onChange;
    private onTouched;
    private valueSubject;
    private disabledSubject;
    private host;
    readonly value: import("rxjs").Observable<T>;
    readonly disabled: import("rxjs").Observable<boolean>;
    onBlur(event: FocusEvent): void;
    ngOnDestroy(): void;
    valueChange(v: T): void;
    touchedChange(v: boolean): void;
    writeValue(obj: T): void;
    registerOnChange(fn: OnChangeFunction): void;
    registerOnTouched(fn: OnTouchedFunction): void;
    setDisabledState(isDisabled: boolean): void;
    setHost(host: unknown): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ValueAccessorDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ValueAccessorDirective<any>, never, never, {}, {}, never, never, true, never>;
}
export {};
