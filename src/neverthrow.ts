import { ok } from 'neverthrow';
import { consola } from 'consola';

const markdownLintResult = ok({ errors: 0, warnings: 2 });

if (markdownLintResult.isOk())
    consola.info(`All right:\n${markdownLintResult.value}`);
else
    consola.error(`Something is bad`);


const la = 'vfv0';

console.log(la);
