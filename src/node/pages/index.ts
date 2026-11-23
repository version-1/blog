import { normalizeSlash } from '../../lib/routes'
import { Logger, LogLevel } from '../utils/logger'

const logger = new Logger(LogLevel.INFO)

export const withLog = (createPage: any) => {
  return function (params: any) {
    const _path = normalizeSlash(params.path)
    logger.debug('createPost: path == ', _path)

    createPage({
      ...params,
      path: _path
    })
  }
}

