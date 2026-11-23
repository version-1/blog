import { css } from '@emotion/css'

export default class Style {
  static css(cssStyle: string) {
    return css(cssStyle)
  }

  static join(...styles: string[]) {
    return styles.join(' ')
  }

  static switch(flags: Record<string, boolean>) {
    return Object.keys(flags).filter((key) => flags[key]).join(' ')
  }

  private _data: { [key: string]: any }
  constructor(props: any) {
    let obj: any = {}
    for (const key in props) {
      const capitalKey = key[0].toUpperCase() + key.slice(1, key.length)
      obj[key] = css(` label: ${capitalKey}; ${props[key]} `)
    }
    this._data = obj
  }

  get style() {
    return this._data
  }

  addStyle(key: string, cb: (styles: any) => any) {
    this._data[key] = cb(this._data)
    return this
  }
}
