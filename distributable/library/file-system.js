import _FileSystem from 'fs-extra';
import JSON5 from 'json5';
import { Process } from '@virtualpatterns/mablung-process';
import Touch from 'touch';

class FileSystem {

  static touch(...parameter) {
    return Touch.apply(this, parameter);
  }

  static whenExists(maximumDuration, pollInterval, path) {
    return Process.when(maximumDuration, pollInterval, () => {
      return FileSystem.pathExists(path);
    });
  }

  static whenNotExists(maximumDuration, pollInterval, path) {
    return Process.when(maximumDuration, pollInterval, () => {
      return FileSystem.pathExists(path).
      then(value => !value);
    });
  }

  static readAllJson(path, option = { 'encoding': 'utf-8' }) {
    return FileSystem.readFile(path, option).
    then(contents => {
      return contents.
      split('\n').
      filter(value => value !== '').
      map(value => JSON5.parse(value));
    });
  }}



Object.setPrototypeOf(FileSystem, _FileSystem);

export { FileSystem };
//# sourceMappingURL=file-system.js.map