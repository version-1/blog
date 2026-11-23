const {globSync} = require('glob');
const path = require('path');
const fs = require('fs');
const readlineSync = require('readline-sync');
const moment = require('moment');
const {constants: {categories}} = require('../../src/configs/constants.ts');

const postRoot = path.resolve(__dirname, '../../src/contents/posts');
const templateKey = 'blog-post';
const divider = '---';

const alertForRequired = (key, value) => {
  if (!value || value.length === 0) {
    console.error(`[ERROR] ${key} slug is required`);
    process.exit(1);
  }
};

console.log(`=== postRoot is ${postRoot}`);
const files = globSync('**/index.md', {cwd: postRoot, nodir: true});
const slugs = files.map(file => {
  const id = path.basename(file.replace(/\/index\.md$/, ''));
  return id.substring(9, id.length);
});
const language = readlineSync.question('language? (ja)-> ') || 'ja';

const slug = readlineSync.question('slug? -> ');
alertForRequired('slug', slug);
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(slug)) {
  console.error('Use letters, numbers and hyphens in the slug');
  process.exit(1);
}

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

const tags = readlineSync.question(
  "input tags split by ',' (optional) \n -> ",
);
const tagList = tags.split(',').map(tag => tag.trim()).filter(Boolean);

const now = moment();
const timestamp = now.format('YYYY-MM-DD HH:mm:ss');
const time4path = now.format('YYYY/MM');
const time4slug = now.format('YYYY/MM/DD');
const time4filename = now.format('YYYYMMDD');
const postName = time4filename + '_' + slug;
const postPath = path.join(postRoot, time4path, postName, 'index.md');
const thumbnail = ['', time4path, postName, 'thumbnail.png'].join('/');
const slugPath = ['', time4slug, slug].join('/');

console.log('');
console.log('');
console.log('=== please confirm your input');
console.log(`path : ${postPath} `);
console.log(`language : ${language} `);
console.log(`templateKey : ${templateKey} `);
console.log(`title : ${title} `);
console.log(`slug : ${slugPath} `);
console.log(`createdAt : ${timestamp} `);
console.log(`updatedAt : ${timestamp} `);
console.log(`categories : `);
categoryList.map(item => console.log(' - ', item));
console.log(`tags : `);
tagList.map(item => console.log(' - ', item));
console.log('');
const q = readlineSync.question('are you sure? ( y/n )');
console.log('');

if (!(q === 'yes' || q === 'y')) {
  process.exit(0);
}

const postMeta = {
  templateKey,
  language,
  title,
  slug: slugPath,
  createdAt: timestamp,
  updatedAt: timestamp,
  thumbnail,
  categories: categoryList,
  tags: tagList
};

const data = [
  divider,
  ...Object.keys(postMeta).reduce((acc, key) => {
    const value = postMeta[key];
    if (Array.isArray(value)) {
      if (value.length === 0) return [...acc, `${key}: []`];
      const list = value.map(item => `  - ${JSON.stringify(item)}`);
      return [...acc, `${key}:`, ...list];
    }
    return [...acc, `${key}: ${JSON.stringify(value)}`];
  }, []),
  divider,
].join('\n');

fs.mkdirSync(path.dirname(postPath), {recursive: true});
try {
  fs.writeFileSync(postPath, data, {flag: 'wx'});
} catch (error) {
  if (error.code !== 'EEXIST') throw error;
  console.error(`Article already exists: ${postPath}`);
  process.exit(1);
}
console.log('generate!!!!');
console.log(postPath);
