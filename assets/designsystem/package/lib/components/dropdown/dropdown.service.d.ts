import { OptionGroupComponent } from './optiongroup.component';
import * as i0 from "@angular/core";
export interface SetGroup {
    id: string;
    group: OptionGroupComponent;
}
export declare class DropdownService {
    private group;
    readonly group$: import("rxjs").Observable<SetGroup>;
    setGroup(obj: SetGroup): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DropdownService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DropdownService>;
}
