export const routes = {
  root: '/',
  index: '/',
  about: 'about',
  post: 'posts',
  category: 'categories',
  tag: 'tags',
  populars: 'populars',
  pickups: 'pickups',
}
export const search = {
  index: {
    development: 'my-blog-posts-development',
    production: 'my-blog-posts'
  }
}

export const meta = {
  author: 'Jiro',
  siteUrl: 'https://ver-1-0.net',
  logo: 'https://statics.ver-1-0.xyz/uploads/others/default-thumbnail.png',
  hostname: 'ver-1-0.net',
  title: 'Ver.1.0 Blog',
  description:
    'フリーランスエンジニアのブログです。フリーランス、プログラミング、旅行について「ブログ書け、コード書け」というテーマでやらせてもらってます。',
  sitemap: '/sitemap-index.xml',
  trackingId: 'UA-71833989-5',
  inquiry: 'https://forms.gle/Efmkr3UyawetjrjM6',
  images: {
    url: 'https://statics.ver-1-0.xyz/uploads'
  },
  postRoot: '/Users/admin/Projects/Private/blog/src/contents/posts',
  lab: {
    description: `プログラミング初学者〜中級者が実務で通用するレベルのプログラミングができるようになるための情報を発信しているサイトです。個別具体的な情報よりエンジニアとして良い習慣が身につくための情報を発信していきます。`,
    defaultThumbnail: `https://statics.ver-1-0.xyz/uploads/others/default-thumbnail.png`,
    title: 'Ver.1.0 Lab'
  }
}
export const constants = {
  per: 9,
  categories: [
    'column',
    'cryptocurrency-blockchain',
    'design',
    'engineering',
    'for-beginner',
    'freelance',
    'rails',
    'react',
    'travel'
  ],
  selectors: [
    '.js-ga-click-levatech-freelance',
    '.js-ga-click-it-propartners',
    '.js-ga-click-potepan-freelance',
    '.js-ga-click-book-marketing-sence',
    '.js-ga-click-sns-twitter',
    '.js-ga-click-sns-facebook',
    '.js-ga-click-sns-google-plus',
    '.js-ga-click-sns-reddit',
    '.js-ga-click-sns-pocket',
    '.js-ga-click-sns-hatebu',
    '.js-ga-click-amazon',
    '.js-ga-click-airtori',
    '.js-ga-click-global-wifi',
    '.adsense'
  ],
  pickup: [
    '/2021/12/21/scheduling-for-programming',
    '/2021/04/15/started-to-work-in-tronto',
    '/2020/11/14/publish-snake-game-material',
    '/2019/09/24/get-start-circle-ci-confg-2-1',
    '/2019/05/13/gin-gorm-gqlgen-crud'
  ],
  pages: ['about']
}
