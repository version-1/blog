import { normalizeSlash } from '../../lib/routes'

export enum LogLevel {
  DEBUG,
  INFO,
  WARN,
  ERROR,
}

export class Logger {
  level: LogLevel = LogLevel.INFO
  constructor(level: LogLevel) {
    this.level = level
  }

  debug(...message: any[]) {
    if (this.level > LogLevel.DEBUG) {
      return
    }
    console.log('[DEBUG]', ...message)
  }

  info(...message: any[]) {
    if (this.level > LogLevel.INFO) {
      return
    }
    console.log('[INFO]', ...message)
  }
}

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
