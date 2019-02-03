const glob = require('glob');
const path = require('path');
const fs = require('fs');
const readlineSync = require('readline-sync');
const moment = require('moment');
const config = require('../../config/constants');

const {categories} = config.constants;
const {postRoot} = config.meta;
const templateKey = 'blog-post';
const divider = '---';

const mkdirSyncPenetrate = postPath => {
  postPath.split('/').reduce((acc, item) => {
    const path = item ? [acc, item].join('/') : '';
    if (path && !fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    return path;
  }, '');
};

const alertForRequired = (key, value) => {
  if (!value || value.length === 0) {
    console.error(`[ERROR} ${key} slug is required`);
    process.exit(1);
  }
};

const pattern = postRoot + '/**/index.md';
console.log(`=== postRoot is ${postRoot}`);
const files = glob.sync(pattern);
const slugs = files.map(file => {
  const id = path.basename(file.replace(/\/index\.md$/, ''));
  return id.substring(9, id.length);
});

const slug = readlineSync.question('slug? -> ');
alertForRequired('slug', slug);

if (slugs.includes(slug)) {
  console.error(`${slug} is already exist`);
  console.error(slugs);
  process.exit(1);
}

const title = readlineSync.question('title? -> ');
alertForRequired('title', title);

console.log('input categories');
console.log(categories);
const _categories = readlineSync.question(
  "input categories split by ',' \n -> ",
);
const categoryList = _categories.split(',').map(category => category.trim());
alertForRequired('categories', categoryList);
categoryList.forEach(category => {
  if (!categories.includes(category)) {
    console.error(`${category} is not exist in category list`);
    process.exit(1);
  }
});

const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
const time4path = moment(timestamp).format('YYYY/MM');
const time4slug = moment(timestamp).format('YYYY/MM/DD');
const time4filename = moment(timestamp).format('YYYYMMDD');
const postName = time4filename + '_' + slug;
const postPath = [postRoot, time4path, postName, 'index.md'].join('/');
const thumbnail = ['', time4path, postName, 'thumbnail.png'].join('/');
const slugPath = ['', time4slug, slug].join('/');

console.log('');
console.log('');
console.log('=== please confirm your input');
console.log(`path : ${postPath} `);
console.log(`templateKey : ${templateKey} `);
console.log(`title : ${title} `);
console.log(`slug : ${slugPath} `);
console.log(`createdAt : ${timestamp} `);
console.log(`updatedAt : ${timestamp} `);
console.log(`categories : `);
categoryList.map(item => console.log(' - ', item));
console.log('');
const q = readlineSync.question('are you sure? ( y/n )');
console.log('');

if (!(q === 'yes' || q === 'y')) {
  process.exit(0);
}

const postMeta = {
  templateKey,
  title,
  slug: slugPath,
  createdAt: timestamp,
  updatedAt: timestamp,
  thumbnail,
  categories: categoryList,
};

const data = [
  divider,
  ...Object.keys(postMeta).reduce((acc, key) => {
    const value = postMeta[key];
    if (value instanceof Array) {
      const list = value.map(item => `  - ${item}`);
      return [...acc, `${key}:`, ...list];
    }
    return [...acc, `${key}: ${value}`];
  }, []),
  divider,
].join('\n');

mkdirSyncPenetrate(path.dirname(postPath));
fs.writeFileSync(postPath, data);
console.log('generate!!!!');
console.log(postPath);
