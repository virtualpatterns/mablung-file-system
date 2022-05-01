import { CreateRandomId } from '@virtualpatterns/mablung-worker/test'
import { FileSystem } from '@virtualpatterns/mablung-file-system'
import { Path } from '@virtualpatterns/mablung-path'
import Test from 'ava'

const FilePath = __filePath
const FolderPath = Path.dirname(FilePath)

const DataPath = FilePath.replace('/release/', '/data/').replace(/\.test\.c?js/, '')

Test.before(() => {
  return FileSystem.emptyDir(DataPath)
})

Test('readJson(\'...\')', (test) => {
  return test.notThrowsAsync(FileSystem.readJson(Path.resolve(FolderPath, './resource/file-0.json')))
})

Test('readJsonSync(\'...\')', (test) => {
  test.notThrows(() => {
    FileSystem.readJsonSync(Path.resolve(FolderPath, './resource/file-0.json'))
  })
})

Test('touch(\'...\')', async (test) => {

  let id = await CreateRandomId()
  let dataPath = Path.resolve(DataPath, `${id}.data`)

  test.false(await FileSystem.pathExists(dataPath))
  await FileSystem.touch(dataPath)
  test.true(await FileSystem.pathExists(dataPath))
  
})
