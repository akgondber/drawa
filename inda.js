import {execa} from 'execa';
import Prompt from 'enquirer';
import { input } from '@inquirer/prompts';
import select, { Separator } from '@inquirer/select';
import * as R from 'ramda';

//console.log(R.pipe(R.applySpec({a: R.sum}), R.prop('a'))(4, 6));
const getCmd = (f) => [f];
const exe = async (cmd) => {
    const res = await execa('git', cmd);
    if (/no changes added to com/.exec(res.stdout)) {
        console.log('Nothing');

        const answer = await select({
            message: 'Select a package manager please',
            choices: [
              {
                name: 'npm',
                value: 'npm',
                description: 'npm is the most popular package manager',
              },
              {
                name: 'yarn',
                value: 'yarn',
                description: 'yarn is an awesome package manager',
              },
              new Separator(),
              {
                name: 'jspm',
                value: 'jspm',
                disabled: true,
              },
              {
                name: 'pnpm',
                value: 'pnpm',
                disabled: '(pnpm is not available)',
              },
            ],
          });
        console.log(answer);
    }

    return `
        ${res.escapedCommand}
        --------------------
        ${res.stdout}
    `;
};

const fr = R.pipe(getCmd, exe, R.andThen(console.log))('status');
console.log('GGGGGGGGGG', fr);

const {stdout} = await execa('git', ['status', '--porcelain']);
const items = stdout.split('\n').map(el => el.split(/\s+/));
console.log(items);
console.log('+++++++++++++++++++');
console.log(R.last(R.last(items)));

const answer = await input({ message: 'Enter your name' });
if (answer === 'w') {
    // process.exitCode = 0;
    process.exit();
    console.log('scvf ', answer);
} else {
    console.log(answer);
}

console.log('-=======-');
const toAdd = [];
const shortFlagsMapping = {
    'A': 'added',
    'M': 'modified',
    'D': 'deleted',
};
// const getChangeTags = (changesFlags) => {
//     if (changesFlags.length === 2) {
//         return [R.prop(R.nth(1, changesFlags)!, shortFlagsMapping)!];
//     } else {
//         return ['staged', R.prop(R.nth(1, changesFlags)!, shortFlagsMapping)!];
//     }
// }
console.log(items);

const getChangeTags = (changesFlags) => {
							if (changesFlags.length === 2) {
								return [R.prop(R.nth(1, changesFlags), shortFlagsMapping)];
							} else {
								if (changesFlags[0] === '??') {
									return ['untracked'];
								}
								return ['staged', R.prop(R.nth(0, changesFlags), shortFlagsMapping)];
							}
						};
items.map(parts => {
    const ty = R.take(parts.length - 1, parts);
    const ns = getChangeTags(ty);
    console.log(parts.join(' '));
    console.log('***************');
    console.log(ns);
    console.log('=======================');
});
