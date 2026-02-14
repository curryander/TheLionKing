"use strict";
/* eslint prettier/prettier: 0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleProjectName = exports.addImportAndDeclaration = exports.updateAppWithComponent = exports.getComponentPath = void 0;
const core_1 = require("@angular-devkit/core");
const workspace_1 = require("@schematics/angular/utility/workspace");
/*
 * Validates given project name, returns complete path for the schematic, i.e. src/lib/x/y.
 * Will try to find default project name if no project parameter was provided.
 */
const getComponentPath = async (tree, projectParameter) => {
    const workspace = await (0, workspace_1.getWorkspace)(tree);
    const projectName = projectParameter || workspace.extensions.defaultProject || getSingleProjectName(workspace);
    if (!projectName) {
        throw new Error('No default project found. Please specify a project name.');
    }
    const project = workspace.projects.get(projectName);
    if (!project) {
        throw new Error(`Project "${projectName}" does not exist.`);
    }
    const projectType = project.extensions.projectType === 'application' ? 'app' : 'lib';
    const path = `${project.sourceRoot}/${projectType}`;
    return path;
};
exports.getComponentPath = getComponentPath;
/*
 * Given component name and the project path, it will read and parse the
 * source code files for either app.module or app.component (standalone),
 * afterwards it will insert the import statements into the file.
 */
const updateAppWithComponent = (name, path, subfolder = '') => (tree) => {
    const modulePath = `${path}/app.module.ts`;
    const componentPath = `${path}/app.component.ts`;
    const filePath = tree.exists(modulePath) ? modulePath : componentPath;
    const text = tree.read(filePath);
    if (text === null) {
        throw new Error(`File ${filePath} does not exist.`);
    }
    const sourceText = text.toString('utf-8');
    const componentClass = `${core_1.strings.classify(name)}Component`;
    const importPath = `${core_1.strings.dasherize(name)}/${core_1.strings.dasherize(name)}.component`;
    const updatedSource = addImportAndDeclaration(sourceText, componentClass, subfolder ? `./${subfolder}/${importPath}` : `./${importPath}`);
    tree.overwrite(filePath, updatedSource);
    return tree;
};
exports.updateAppWithComponent = updateAppWithComponent;
const addImportAndDeclaration = (source, componentName, componentPath) => {
    const importStatement = `import { ${componentName} } from '${componentPath}';\n`;
    const importRegex = /^import[\s\S]*?from\s+['"].*?['"];/gm;
    let lastImportMatch = null;
    let matchLast;
    // Find the position of the last import statement
    while ((matchLast = importRegex.exec(source)) !== null) {
        lastImportMatch = matchLast;
    }
    if (!source.includes(importStatement) && lastImportMatch) {
        const lastImportIndex = lastImportMatch.index + lastImportMatch[0].length;
        const insertionPoint = source.indexOf('\n', lastImportIndex) + 1;
        source = `${source.slice(0, insertionPoint)}${importStatement}${source.slice(insertionPoint)}`;
    }
    const regex = new RegExp('imports:\\s*\\[');
    const match = source.match(regex);
    if (match) {
        const position = match.index + match[0].length;
        source = `${source.slice(0, position)}${componentName}, ${source.slice(position)}`;
    }
    else {
        console.error('Import array could not be found in module or component. Please import the generated files it manually!');
    }
    return source;
};
exports.addImportAndDeclaration = addImportAndDeclaration;
const getSingleProjectName = (workspace) => {
    const projects = Array.from(workspace.projects.keys());
    return projects.length === 1 ? projects[0] : null;
};
exports.getSingleProjectName = getSingleProjectName;
//# sourceMappingURL=utils.js.map