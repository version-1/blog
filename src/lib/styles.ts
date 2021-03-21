import { css } from '@emotion/react'

export default class Style {
  static css (cssStyle: string) {
    return css(cssStyle)
  }

  private _data: { [key: string]: any }
  constructor(props: any) {
    let obj: any = {}
    for (const key in props) {
      obj[key] = css(props[key])
    }
    this._data = obj
  }

  get style () {
    return this._data
  }

  get hoge () {
    return this._data
  }


  addStyle(key: string, cb: (styles: any) => any) {
    this._data[key] = cb(this._data)
    return this
  }
}

