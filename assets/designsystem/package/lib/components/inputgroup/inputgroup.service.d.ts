import { RadiobuttonComponent } from '../radiobutton/radiobutton.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import * as i0 from "@angular/core";
interface StatesSubject {
    id: string;
    disabled?: boolean;
    checked?: boolean;
    value?: string | number;
    child?: RadiobuttonComponent | CheckboxComponent;
}
interface ErrorSubject {
    id: string;
    hasError: boolean;
    hasInfo: boolean;
    hasWarning: boolean;
}
export declare class InputGroupService {
    private register;
    private unregister;
    private changes;
    private errors;
    readonly register$: import("rxjs").Observable<StatesSubject>;
    readonly unregister$: import("rxjs").Observable<StatesSubject>;
    readonly changes$: import("rxjs").Observable<StatesSubject>;
    readonly errors$: import("rxjs").Observable<ErrorSubject>;
    registerChild(obj: StatesSubject): void;
    unregisterChild(obj: StatesSubject): void;
    change(obj: StatesSubject): void;
    setErrors(obj: ErrorSubject): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<InputGroupService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<InputGroupService>;
}
export {};
