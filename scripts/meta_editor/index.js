const glob = require('glob');
const path = require('path');
const fs = require('fs');
const moment = require('moment');
const config = require('../../config/constants');

const {categories} = config.constants;
const {postRoot} = config.meta;
const divider = '---'

const MODE = [
  'add',
  'remove'
]

const alertForRequired = (key, value) => {
  if (!value || value.length === 0) {
    console.error(`[ERROR} ${key} is required`);
    process.exit(1);
  }
};

const alertForInvalid = (key, cb) => {
  if (!cb) {
    console.error(`[ERROR} ${key} is invalid`);
    process.exit(1);
  }
};

const add = (article, tag, value) => {
  if (Object.keys(article).includes(tag)) {
    throw new Error(`${tag} tag is already exist`)
  }
  const _value = value.indexOf(',') ? value.split(',') : value
  return {
    ...article,
    headers: [...article.headers, { key: tag, value: _value }]
  }
}

const remove = (article, tag) => {
  if (!Object.keys(article).includes(tag)) {
    throw new Error(`${tag} tag is not exist`)
  }
  const headers = article.headers.filter(({ key, value }) => {
    return key !== tag
  })
  return {
    ...article,
    headers
  }
}

const serialize = (article) => {
  const header = article.headers.reduce((acc, { key, value }) => {
    const _key = key + ':'
    if (Array.isArray(value)) {
      return [...acc, ...[_key, ...value.map(item => `  - ${item}`)]]
    }
    return [...acc, [_key, value].join(' ')]
  }, [])

  return [divider, ...header, divider, ...article.body].join("\n")
}

const parse = (lines) => {
  let meta = false
  let metaKey = null
  let i = 0
  let article = {
    headers: [],
    body: []
  }
  while (i < lines.length) {
    const line = lines[i]
    const nextLine = lines[i+1]

    if (line === divider) {
      meta = !meta
      i++
      continue
    }

    if (meta) {
      const index = line.indexOf(':')
      const key = line.slice(0, index)
      if (nextLine.match(arrayMatcher)){
        // keyが配列の場合
        // keyの値を先取りしてiの値を先取りした分加算する。
        let j = 1
        let value = []
        while (lines[i + j].match(arrayMatcher)) {
          newValue = lines[i + j].replace(arrayMatcher, '')
          value = [...value, newValue]
          j++
        }
        article = {
          ...article,
          headers: [...article.headers, { key, value }]
        }
        i = i + j
        continue
      } else {
        // keyが配列でない場合
        const value = line.slice(index + 1).trim()
        article = {
          ...article,
          headers: [...article.headers, { key, value }]
        }
      }
    } else {
      article = {
        ...article,
        body: [...article.body, line]
      }
    }
    i++
  }
  return article
}

const { argv } = process
const mode = argv[2]
const tag  = argv[3]
const value = argv[4]
const defaultPattern = postRoot + '/**/index.md';
const pattern = argv[5] || defaultPattern
alertForInvalid('mode', () => MODE.includes(mode))
alertForRequired('tag', tag)
if ( mode === 'add') {
  alertForRequired('value', value)
}


const operator = {
  add,
  remove
}

const keyMatcher = /^[a-zA-Z0-9].*:/
const arrayMatcher = /^  - /

console.log(`=== pattern is ${pattern}`);
const files = glob.sync(pattern);
const list = files.map(file => {
  console.log('source:', file)
  const tmp = file + '.tmp'
  const content = fs.readFileSync(file, "utf8");
  const lines = content.split("\n")
  const article = parse(lines)
  const _article = operator[mode](article, tag, value)
  const data = serialize(_article)
  fs.writeFileSync(tmp, data);
  fs.copyFileSync(tmp, file)
  fs.unlinkSync(tmp)
});

