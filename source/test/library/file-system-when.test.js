import { ProcessDurationExceededError } from '@virtualpatterns/mablung-process'
import Path from 'path'
import Test from 'ava'

import { FileSystem } from '../../index.js'

const FilePath = __filePath
const PidPath = FilePath.replace('/release/', '/data/').replace('.test.js', '.pid')
const MaximumDuration = 1000
const PollInterval = parseInt(Math.ceil(MaximumDuration / 4.00))

Test.before(() => {
  return FileSystem.ensureDir(Path.dirname(PidPath))
})

Test.beforeEach(() => {
  return FileSystem.remove(PidPath)
})

Test.serial('whenExists(..., ..., \'...\')', async (test) => {

  await FileSystem.touch(PidPath)

  try {
    await test.notThrowsAsync(FileSystem.whenExists(MaximumDuration, PollInterval, PidPath))
  } finally {
    await FileSystem.remove(PidPath)
  }

})

Test.serial('whenExists(..., ..., \'...\') throws ProcessDurationExceededError', (test) => {
  return test.throwsAsync(FileSystem.whenExists(MaximumDuration, PollInterval, PidPath), { 'instanceOf': ProcessDurationExceededError })
})

Test.serial('whenNotExists(..., ..., \'...\')', (test) => {
  return test.notThrowsAsync(FileSystem.whenNotExists(MaximumDuration, PollInterval, PidPath))
})

Test.serial('whenNotExists(..., ..., \'...\') throws ProcessDurationExceededError', async (test) => {

  await FileSystem.touch(PidPath)

  try {
    await test.throwsAsync(FileSystem.whenNotExists(MaximumDuration, PollInterval, PidPath), { 'instanceOf': ProcessDurationExceededError })
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
