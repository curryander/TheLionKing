"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ngAdd = ngAdd;
const tasks_1 = require("@angular-devkit/schematics/tasks");
/**
 * This schematic adds the DRVD library to the host application.
 * It installs the necessary dependencies and logs a success message.
 * @returns {Rule} A rule that performs the installation.
 */
function ngAdd() {
    return (tree, context) => {
        context.addTask(new tasks_1.NodePackageInstallTask());
        context.logger.info('Successfully added DRVD to your project.');
        return tree;
    };
}
//# sourceMappingURL=index.js.map