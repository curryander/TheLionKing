import { Rule, Tree } from '@angular-devkit/schematics';
import { WorkspaceDefinition } from '@angular-devkit/core/src/workspace';
declare const getComponentPath: (tree: Tree, projectParameter: string) => Promise<string>;
declare const updateAppWithComponent: (name: string, path: string, subfolder?: string) => Rule;
declare const addImportAndDeclaration: (source: string, componentName: string, componentPath: string) => string;
declare const getSingleProjectName: (workspace: WorkspaceDefinition) => string;
export { getComponentPath, updateAppWithComponent, addImportAndDeclaration, getSingleProjectName };
