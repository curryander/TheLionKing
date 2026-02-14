"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginatedTableSchematic = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
const utils_1 = require("../utils");
const paginatedTableSchematic = (options) => {
    console.log('Applying paginated table schematic...');
    return async (tree) => {
        const path = await (0, utils_1.getComponentPath)(tree, options.project);
        const templateSource = (0, schematics_1.apply)((0, schematics_1.url)('./files'), [
            (0, schematics_1.applyTemplates)({
                classify: core_1.strings.classify,
                dasherize: core_1.strings.dasherize,
                selector: options.selector,
                name: options.name,
            }),
            (0, schematics_1.move)((0, core_1.normalize)(`${path}/${options.name}`)),
        ]);
        const rules = [(0, schematics_1.mergeWith)(templateSource), (0, utils_1.updateAppWithComponent)(options.name, path)];
        return (0, schematics_1.chain)(rules);
    };
};
exports.paginatedTableSchematic = paginatedTableSchematic;
//# sourceMappingURL=index.js.map