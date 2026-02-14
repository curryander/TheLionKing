"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProviderToAppConfig = exports.addProviderToModule = exports.addImportStatement = exports.getImportString = exports.getConfigString = exports.updateAppWithConfig = exports.configSchematic = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const schema_1 = require("./schema");
const utils_1 = require("../utils");
const configStringPubl = '{ provide: CONFIG_TOKEN, useValue: { ...DEFAULT_CONFIG_PUBLIC } }';
const configStringProd = '{ provide: CONFIG_TOKEN, useValue: { ...DEFAULT_CONFIG_PRODUCTIVE } }';
const configStringEject = `{ provide: CONFIG_TOKEN, useValue: {
  spritePath: './assets/img/sprite.svg',
  pictogramSpritePath: './assets/img/pictograms.svg',
  formsRequiredDefault: true,
  formsRequiredDefaultSign: '',
  formsOptionalDefaultText: 'optional',
  theadDefaultBackgroundUI: 'dark',
  progressnavDefaultDisabled: true,
  notificationDefaultToastPosition: 'bottom',
  applicationHeaderDefaultLayout: 'multiline',
  showKeyboardshortCutAsTooltip: true,
  reducedMotion: false,
  useTheme: false,
  themePath: undefined,
  symbolsPath: './assets/img/symbols.svg',
  }}`;
const importStatementPubl = `import {
  CONFIG_TOKEN,
  DEFAULT_CONFIG_PUBLIC,
} from '@drv-ds/drv-design-system-ng';\n`;
const importStatementProd = `import {
  CONFIG_TOKEN,
  DEFAULT_CONFIG_PRODUCTIVE
} from '@drv-ds/drv-design-system-ng';\n`;
const importStatementEject = 'import { CONFIG_TOKEN } from "@drv-ds/drv-design-system-ng";\n';
/*
 * Adds a default config to either app.module or main.ts
 */
const configSchematic = (options) => {
    console.log('Applying form config schematic...');
    return async (tree) => {
        const path = await (0, utils_1.getComponentPath)(tree, options.project);
        return (0, schematics_1.chain)([updateAppWithConfig(path, options.theme)]);
    };
};
exports.configSchematic = configSchematic;
const updateAppWithConfig = (path, theme) => (tree) => {
    const modulePath = `${path}/app.module.ts`;
    const configPath = `${path}/app.config.ts`;
    const isStandalone = !tree.exists(modulePath);
    const filePath = isStandalone ? configPath : modulePath;
    const text = tree.read(filePath);
    let source = '';
    if (text === null) {
        throw new Error(`File ${filePath} does not exist. Aborted!`);
    }
    const configStr = getConfigString(theme);
    const importStr = getImportString(theme);
    source = text.toString('utf-8');
    source = addImportStatement(source, importStr);
    source = isStandalone ? addProviderToAppConfig(source, configStr) : addProviderToModule(source, configStr);
    tree.overwrite(filePath, source);
    return tree;
};
exports.updateAppWithConfig = updateAppWithConfig;
const getConfigString = (theme) => ({
    [schema_1.Theme.productive]: configStringProd,
    [schema_1.Theme.eject]: configStringEject,
})[theme] || configStringPubl;
exports.getConfigString = getConfigString;
const getImportString = (theme) => ({
    [schema_1.Theme.productive]: importStatementProd,
    [schema_1.Theme.eject]: importStatementEject,
})[theme] || importStatementPubl;
exports.getImportString = getImportString;
const addImportStatement = (source, importString) => {
    const importRegex = /^import[\s\S]*?from\s+['"].*?['"];/gm;
    let lastImportMatch = null;
    let match;
    while ((match = importRegex.exec(source)) !== null) {
        lastImportMatch = match;
    }
    if (!source.includes(importString) && lastImportMatch) {
        const lastImportIndex = lastImportMatch.index + lastImportMatch[0].length;
        const insertionPoint = source.indexOf('\n', lastImportIndex) + 1;
        source = `${source.slice(0, insertionPoint)}${importString}${source.slice(insertionPoint)}`;
    }
    return source;
};
exports.addImportStatement = addImportStatement;
const addProviderToModule = (source, configString) => {
    const providersRegex = /providers\s*:\s*\[([^\]]*)\]/s;
    const ngModuleRegex = /@NgModule\s*\(\s*{([\s\S]*?)}\s*\)/;
    if (providersRegex.test(source)) {
        // If providers array exists, add the new provider at the beginning
        source = source.replace(providersRegex, (match, providersContent) => `providers: [${configString}${providersContent.trim() ? ', ' + providersContent.trim() : ''}]`);
    }
    else if (ngModuleRegex.test(source)) {
        // If providers array does not exist, create it
        source = source.replace(ngModuleRegex, (match, group1) => match.replace(group1, `${group1}, providers: [${configString}]`));
    }
    else {
        console.error('Neither providers array nor ngModule decorator could not be found in module. Aborted!');
    }
    return source;
};
exports.addProviderToModule = addProviderToModule;
const addProviderToAppConfig = (source, configString) => {
    const providersRegex = /providers\s*:\s*\[([^\]]*)\]/s;
    if (providersRegex.test(source)) {
        source = source.replace(providersRegex, (match, providersContent) => `providers: [${configString}${providersContent.trim() ? ', ' + providersContent.trim() : ''}]`);
    }
    else {
        console.error('Providers array could not be found in app.config. Aborted!');
    }
    return source;
};
exports.addProviderToAppConfig = addProviderToAppConfig;
//# sourceMappingURL=index.js.map