import { CreateRandomId } from '@virtualpatterns/mablung-worker/test'
import { FileSystem } from '@virtualpatterns/mablung-file-system'
import { ProcessDurationExceededError } from '@virtualpatterns/mablung-process'
import { Path } from '@virtualpatterns/mablung-path'
import Test from 'ava'

const FilePath = __filePath

const DataPath = FilePath.replace('/release/', '/data/').replace(/\.test\.c?js/, '')

Test.before(() => {
  return FileSystem.emptyDir(DataPath)
})

Test.beforeEach(async (test) => {

  let id = await CreateRandomId()
  let dataPath = Path.resolve(DataPath, `${id}.data`)

  test.context.dataPath = dataPath

})

Test('whenExists(\'...\')', async (test) => {
  await FileSystem.touch(test.context.dataPath)
  return test.notThrowsAsync(FileSystem.whenExists(test.context.dataPath))
})

Test('whenExists(\'...\') throws ProcessDurationExceededError', (test) => {
  return test.throwsAsync(FileSystem.whenExists(test.context.dataPath), { 'instanceOf': ProcessDurationExceededError })
})

Test('whenNotExists(\'...\')', (test) => {
  return test.notThrowsAsync(FileSystem.whenNotExists(test.context.dataPath))
})

Test('whenNotExists(\'...\') throws ProcessDurationExceededError', async (test) => {
  await FileSystem.touch(test.context.dataPath)
  return test.throwsAsync(FileSystem.whenNotExists(test.context.dataPath), { 'instanceOf': ProcessDurationExceededError })
})
