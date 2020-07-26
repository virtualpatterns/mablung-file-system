import { Path } from '@virtualpatterns/mablung-path'
// import Source from 'source-map-support'
import Touch from 'touch'

import { FileSystem } from '../library/file-system'

// Source.install({ 'handleUncaughtExceptions': true })

;(async () => {

  try {

    let maximumDuration = 1000
    let pollInterval = maximumDuration / 4
    let path = Path.join('resource', 'FileSystem', 'touch', 'process.pid')

    await FileSystem.whenExists(maximumDuration, pollInterval, path)

  } catch (error) {
    console.error(error)
  }

})()
