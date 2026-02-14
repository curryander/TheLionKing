"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlTableSchematic = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
const utils_1 = require("../../utils");
const htmlTableSchematic = (options) => {
    const name = 'html-table';
    console.log('Applying html-table schematic...');
    return async (tree) => {
        const path = await (0, utils_1.getComponentPath)(tree, options.project);
        const templateSource = (0, schematics_1.apply)((0, schematics_1.url)('./files'), [
            (0, schematics_1.applyTemplates)({
                classify: core_1.strings.classify,
                selector: options.selector,
                name: name,
            }),
            (0, schematics_1.move)((0, core_1.normalize)(`${path}/examples/${name}`)),
        ]);
        return (0, schematics_1.chain)([(0, schematics_1.mergeWith)(templateSource), (0, utils_1.updateAppWithComponent)(name, path, 'examples')]);
    };
};
exports.htmlTableSchematic = htmlTableSchematic;
//# sourceMappingURL=index.js.map