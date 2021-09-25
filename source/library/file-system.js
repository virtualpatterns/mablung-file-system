import { Process } from '@virtualpatterns/mablung-process'
import BaseFileSystem from 'fs-extra'
// import JSON5 from 'json5'
import Touch from 'touch'

class FileSystem {

  static touch(...argument) {
    return Touch.apply(this, argument)
  }

  static whenExists(maximumDuration, pollInterval, path) {
    return Process.when(maximumDuration, pollInterval, () => {
      return FileSystem.pathExists(path)
    })
  }
    
  static whenNotExists(maximumDuration, pollInterval, path) {
    return Process.when(maximumDuration, pollInterval, () => {
      return FileSystem.pathExists(path)
        .then((value) => !value)
    })
  }

  // static readAllJson(path, option = { 'encoding': 'utf-8' }) {
  //   return FileSystem.readFile(path, option)
  //     .then((contents) => {
  //       return contents
  //         .split('\n')
  //         .filter((value) => value !== '')
  //         .map((value) => JSON5.parse(value))
  //     })
  // }

}

Object.setPrototypeOf(FileSystem, BaseFileSystem)

export { FileSystem }
