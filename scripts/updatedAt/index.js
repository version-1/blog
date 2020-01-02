const path = require('path');
const fs = require('fs');
const moment = require('moment');

const alertForRequired = (key, value) => {
  if (!value || value.length === 0) {
    console.error(`[ERROR] ${key} is required`);
    process.exit(1);
  }
};

const update = (lines) => {
  const timestamp = moment().format('YYYY-MM-DD HH:mm:ss')
  const matcher = /^updatedAt:.*$/
  const data = lines.map(line => {
    if (line.match(matcher)) {
      return `updatedAt: ${timestamp}`
    }
    return line
  })
  return data.join("\n")
}

const { argv } = process
const paths = argv.slice(2, argv.length)
alertForRequired('path', paths)

const list = paths.map(path => {
  console.log('update timestamp:', path)
  const tmp = path + '.tmp'
  const content = fs.readFileSync(path, "utf8");
  const lines = content.split("\n")
  const data = update(lines)
  fs.writeFileSync(tmp, data);
  fs.copyFileSync(tmp, path)
  fs.unlinkSync(tmp)
});

