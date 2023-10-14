"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var neverthrow_1 = require("neverthrow");
var consola_1 = require("consola");
var markdownLintResult = (0, neverthrow_1.ok)({ errors: 0, warnings: 2 });
if (markdownLintResult.isOk())
    consola_1.consola.info("All right:\n".concat(markdownLintResult.value));
else
    consola_1.consola.error("Something is bad");
var la = 'vfv0';
console.log(la);
