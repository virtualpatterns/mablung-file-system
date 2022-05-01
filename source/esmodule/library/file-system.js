import { Process } from '@virtualpatterns/mablung-process'
import BaseFileSystem from 'fs-extra'
import Json from 'json5'
import Touch from 'touch'

class FileSystem {

  static readJson(...argument) {
    return FileSystem.readFile(...argument)
      .then((...argument) => Json.parse(...argument))
  }

  static readJsonSync(...argument) {
    return Json.parse(FileSystem.readFileSync(...argument))
  }

  static touch(...argument) {
    return Touch.apply(this, argument)
  }

  static whenExists(path, pollInterval, maximumDuration) {
    return Process.when(() => {
      return FileSystem.pathExists(path)
    }, pollInterval, maximumDuration)
  }
    
  static whenNotExists(path, pollInterval, maximumDuration) {
    return Process.when(() => {
      return FileSystem.pathExists(path)
        .then((value) => !value)
    }, pollInterval, maximumDuration)
  }

}

Object.setPrototypeOf(FileSystem, BaseFileSystem)

export { FileSystem }
