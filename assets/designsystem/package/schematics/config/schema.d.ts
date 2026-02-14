export declare enum Theme {
    public = "public",
    productive = "productive",
    eject = "eject"
}
export interface SchemaOptions {
    project: string;
    selector: string;
}
export interface ThemeSchemaOptions {
    project?: string;
    theme: Theme;
}
export interface FormValidationSchemaOptions extends SchemaOptions {
    name: string;
    hasInputgroupRadio?: boolean;
    hasDropdown?: boolean;
    hasTextinput?: boolean;
    hasInsuranceNumber?: boolean;
    hasDisabledInput?: boolean;
    hasFormerrors?: boolean;
}
export interface PageTemplateSchemaOptions extends SchemaOptions {
    name: string;
    page: string;
}
export interface PicklistSchemaOptions extends SchemaOptions {
    name: string;
    spec?: boolean;
}
