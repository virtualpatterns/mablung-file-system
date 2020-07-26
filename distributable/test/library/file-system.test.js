import { createRequire as _createRequire } from "module";import Path from 'path';
import { DurationExceededProcessError } from '@virtualpatterns/mablung-process';
import Test from 'ava';

import { FileSystem } from '../../index.js';

const Require = _createRequire(import.meta.url);

Test('FileSystem.touch(path)', async test => {

  let path = 'process/pid/touch.pid';
  await FileSystem.ensureDir(Path.dirname(path));

  await FileSystem.touch(path);

  try {
    test.truthy(await FileSystem.pathExists(path));
  } finally {
    await FileSystem.remove(path);
  }

});

Test('FileSystem.whenExists(maximumDuration, pollInterval, path)', async test => {

  let maximumDuration = 1000;
  let pollInterval = maximumDuration / 4;

  let existsPath = 'process/pid/when-exists.pid';
  await FileSystem.ensureDir(Path.dirname(existsPath));

  let notExistsPath = 'process/pid/_when-exists.pid';

  await FileSystem.touch(existsPath);

  try {

    test.truthy(await FileSystem.whenExists(maximumDuration, pollInterval, existsPath));
    await test.throwsAsync(FileSystem.whenExists(maximumDuration, pollInterval, notExistsPath), { 'instanceOf': DurationExceededProcessError });

  } finally {
    await FileSystem.remove(existsPath);
  }

});

Test('FileSystem.whenNotExists(maximumDuration, pollInterval, path)', async test => {

  let maximumDuration = 1000;
  let pollInterval = maximumDuration / 4;

  let existsPath = 'process/pid/when-not-exists.pid';
  await FileSystem.ensureDir(Path.dirname(existsPath));

  let notExistsPath = 'process/pid/_when-not-exists.pid';

  await FileSystem.touch(existsPath);

  try {

    test.truthy(await FileSystem.whenNotExists(maximumDuration, pollInterval, notExistsPath));
    await test.throwsAsync(FileSystem.whenNotExists(maximumDuration, pollInterval, existsPath), { 'instanceOf': DurationExceededProcessError });

  } finally {
    await FileSystem.remove(existsPath);
  }

});

[
'sample0.json',
'sample0.json5'].
forEach(fileName => {

  Test(`FileSystem.readAllJson('${fileName}')`, async test => {

    let path = Require.resolve(`./resource/file-system/read-all-json/${fileName}`);
    let content = await FileSystem.readAllJson(path);

    test.is(content.length, 3);
    test.is(content[2].type, 'git');

  });

});

[
'sample1.json',
'sample1.json5'].
forEach(fileName => {

  Test(`FileSystem.readAllJson('${fileName}') throws SyntaxError`, async test => {
    let path = Require.resolve(`./resource/file-system/read-all-json/${fileName}`);
    await test.throwsAsync(FileSystem.readAllJson(path), { 'instanceOf': SyntaxError });
  });

});
//# sourceMappingURL=file-system.test.js.map