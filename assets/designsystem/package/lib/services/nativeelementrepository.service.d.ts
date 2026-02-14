import { QueryList } from '@angular/core';
import { FormControlName, FormGroupDirective } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class NativeElementRepositoryService {
    private repository;
    private formGroupDirective;
    get submitted(): boolean;
    init(formControls: QueryList<FormControlName>, formGroupDirective: FormGroupDirective): void;
    findByControlName(name: string | number): FormControlName | undefined;
    getNativeElement(control: FormControlName): HTMLElement | undefined;
    findFirst(): FormControlName | undefined;
    findFirstRequired(): FormControlName | undefined;
    submittedFindFirstWithError(): FormControlName | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<NativeElementRepositoryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NativeElementRepositoryService>;
}
