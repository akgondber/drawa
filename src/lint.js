import retextEnglish from 'retext-english'
import retextPassive from 'retext-passive'
import retextEquality from 'retext-equality'
import retextStringify from 'retext-stringify'
import {read} from 'to-vfile'
import {unified} from 'unified'
import {reporter} from 'vfile-reporter'

const file = await unified()
  .use(retextEnglish)
  .use(retextPassive)
  .use(retextEquality, {
    ignore: ['he', 'she', 'man', 'his', 'him']
  })
  .use(retextStringify)
  .process(await read('data\\presentathanging.md'))

console.error(reporter(file))
