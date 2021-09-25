import Path from 'path'
import Test from 'ava'

import { FileSystem } from '../../index.js'

const FilePath = __filePath
const PidPath = FilePath.replace('/release/', '/data/').replace('.test.js', '.pid')

Test.before(() => {
  return FileSystem.ensureDir(Path.dirname(PidPath))
})

Test.beforeEach(() => {
  return FileSystem.remove(PidPath)
})

Test.serial('touch(\'...\')', async (test) => {

  test.false(await FileSystem.pathExists(PidPath))

  await FileSystem.touch(PidPath)

  try {
    test.true(await FileSystem.pathExists(PidPath))
  } finally {
    await FileSystem.remove(PidPath)
  }

})

// ;[
//   'sample0.json',
//   'sample0.json5'
// ].forEach((fileName) => {

//   Test(`FileSystem.readAllJson('${fileName}')`, async (test) => {

//     let path = Require.resolve(`./resource/file-system/read-all-json/${fileName}`)
//     let content = await FileSystem.readAllJson(path)

//     test.is(content.length, 3)
//     test.is(content[2].type, 'git')

//   })
  
// })

// ;[
//   'sample1.json',
//   'sample1.json5'
// ].forEach((fileName) => {

//   Test(`FileSystem.readAllJson('${fileName}') throws SyntaxError`, async (test) => {
//     let path = Require.resolve(`./resource/file-system/read-all-json/${fileName}`)
//     await test.throwsAsync(FileSystem.readAllJson(path), { 'instanceOf': SyntaxError })
//   })
  
// })
