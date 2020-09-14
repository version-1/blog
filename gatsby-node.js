const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');
const {
  createFilePath,
  createRemoteFileNode,
} = require('gatsby-source-filesystem');
const {fmImagesToRelative} = require('gatsby-remark-relative-images');
const {routes, meta, constants} = require('./config/constants');
const {rootPath} = require('./src/lib/routes');
const moment = require('moment');
const {validateCategoryList} = require('./node/validation');
const {fetch} = require('./node/breadcrumbs');
const {fetchPv} = require('./node/pageview');
const {rating} = require('./node/related-post');
const queries = require('./node/queries.js');

const isProduction = process.env.NODE_ENV === 'production'
const dummyThumbnail = meta.images.url + '/others/dummy/thumbnail.png'

// Constants
const PER_PAGE = constants.per;
const STATIC_PAGE_LIST = constants.pages;

const genShowPath = edge => {
  const {language, slug} = edge.frontmatter;
  const _path = slug || edge.fields.slug;
  return genPath(language, _path);
};

const genPath = (language, slug) => {
  if (language && language !== 'ja') {
    return ['/', language, '/', slug].join('').replace(/\/\//g, '/');
  }
  return slug;
};

const create = createPage => params => {
  const {path: _path, component, context = {}} = params;
  const template = path.parse(component);
  const baseUrl = [meta.siteUrl, _path].join('');
  createPage({
    ...params,
    context: {
      ...context,
      baseUrl,
    },
  });
};

const buildPaginationPages = createPage => (limit = PER_PAGE) => (
  namespace,
  templates,
  totalCounts,
  context = {},
) => {
  const totalPages = Math.ceil(totalCounts / limit);
  Array.from({length: totalPages}).forEach((dummy, currentPageIndex) => {
    const _path =
      currentPageIndex === 0
        ? namespace
        : [namespace, currentPageIndex + 1].join('/');
    const skip = currentPageIndex * limit;
    const params = {
      path: _path,
      component: path.resolve(`src/templates/${templates}.js`),
      context: {
        ...context,
        limit,
        skip,
        index: currentPageIndex + 1,
        totalPages,
      },
    };
    createPage({
      path: _path,
      component: path.resolve(`src/templates/${templates}.js`),
      context: {
        ...context,
        limit,
        skip,
        index: currentPageIndex + 1,
        totalPages,
      },
    });
  });
};

const createPostShowPage = createPage => (posts, pageviews) => context => {
  posts.forEach(edge => {
    const id = edge.id;
    const {tags, categories, slug, templateKey} = edge.frontmatter;
    const breadcrumbs = fetch(context.language);
    const _breadcrumbs = [
      ...context.layout.breadcrumbs,
      breadcrumbs.categories(categories[0]),
    ];
    validateCategoryList(edge, categories);
    validateCategoryList(edge, tags);
    const relatedRatings = rating(posts, edge, pageviews);
    const _path = genShowPath(edge);
    createPage({
      path: _path,
      categories,
      component: path.resolve(`src/templates/${String(templateKey)}.js`),
      context: {
        id,
        ...context,
        related: relatedRatings.slice(0, 6).map(r => r.slug),
        layout: {
          ...context.layout,
          breadcrumbs: _breadcrumbs,
        },
      },
    });
  });
};

const createPostsIndexPage = createPage => totalCount => context => {
  const _path = [routes.root, routes.post].join('/');
  buildPaginationPages(createPage)()(
    genPath(context.language, _path),
    'posts/index',
    totalCount,
    context,
  );
};

const createCollectionShowPage = createPage => (
  key,
  singuralizeKey,
  collection,
) => totalCount => context => {
  const _path = [
    routes.root,
    routes[singuralizeKey],
    _.kebabCase(collection),
  ].join('/');
  const breadcrumbs = fetch(context.language);
  const _breadcrumbs = [
    ...context.layout.breadcrumbs,
    breadcrumbs[key](collection),
  ];
  buildPaginationPages(createPage)()(
    genPath(context.language, _path),
    key,
    totalCount,
    {
      [singuralizeKey]: collection,
      ...context,
      layout: {
        ...context.layout,
        breadcrumbs: _breadcrumbs,
      },
    },
  );
};

const createCategoryShowPage = createPage => category => totalCount => context => {
  return createCollectionShowPage(createPage)(
    'categories',
    'category',
    category,
  )(totalCount)(context);
};

const createTagShowPage = createPage => tag => totalCount => context => {
  return createCollectionShowPage(createPage)('tags', 'tag', tag)(totalCount)(
    context,
  );
};

const createMonthArchivePage = createPage => archives => context => {
  Object.keys(archives).forEach(key => {
    const _path = [routes.root, key].join('/');
    const totalCount = archives[key].length;
    const breadcrumbs = fetch(context.language);
    const _breadcrumbs = [
      ...context.layout.breadcrumbs,
      breadcrumbs.monthArchive(key),
    ];
    buildPaginationPages(createPage)()(
      genPath(context.language, _path),
      'months',
      totalCount,
      {
        month: key,
        ids: archives[key],
        ...context,
        layout: {
          ...context.layout,
          breadcrumbs: _breadcrumbs,
        },
      },
    );
  });
};

const createStaticPage = createPage => page => context => {
  const {id} = page;
  const {templateKey} = page.frontmatter;
  const breadcrumbs = fetch(context.language);
  const _breadcrumbs = [
    ...context.layout.breadcrumbs,
    breadcrumbs[templateKey],
  ];
  const _path = genPath(context.language, templateKey);
  createPage({
    path: _path,
    component: path.resolve(`src/templates/${String(templateKey)}.js`),
    context: {
      id,
      ...context,
      layout: {
        ...context.layout,
        breadcrumbs: _breadcrumbs,
      },
    },
  });
};

const collectCollection = posts => key => {
  return _.uniq(
    _.compact(
      _.flatten(
        posts.map(post => {
          if (_.get(post, `frontmatter.${key}`)) {
            return post.frontmatter[key];
          }
        }),
      ),
    ),
  );
};

const collectTags = posts => collectCollection(posts)('tags');
const collectCategories = posts => collectCollection(posts)('categories');

/* CreatePages
 *
 *
 */

const mainQueries = [
  {language: 'ja', query: queries.jaIndexQuery},
  {language: 'en', query: queries.enIndexQuery},
];

exports.createPages = async ({actions, graphql}) => {
  const {createPage} = actions;
  return Promise.all(
    mainQueries.map(async item => {
      const {language, query} = item;
      const result = await graphql(query);
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()));
      }
      const posts = result.data.allMarkdownRemark.nodes;
      const categories = collectCategories(posts);
      const tags = collectTags(posts).filter(tag => tag !== 'dummy');
      const archiveByMonth = posts.reduce((acc, item) => {
        const key = moment(item.frontmatter.createdAt).format('YYYY/MM');
        return {...acc, [key]: [...(acc[key] || []), item.id]};
      }, {});
      const breadcrumbs = fetch(language);
      const context = {
        language,
        limit: PER_PAGE,
        layout: {
          archiveByMonth,
          breadcrumbs: [breadcrumbs.top],
          categories,
          tags
        },
      };

      let rows = [];
      let pickup = [];
      if (language === 'ja') {
        const pv = await fetchPv();
        rows = pv.reports[0].data.rows;
        const populars = rows.slice(0, 6).map(row => row.dimensions[0]);
        pickup = _.uniq(_.concat(constants.pickup, populars));
        const _context = {
          pickup,
          ...context,
        };
        createPage({
          path: '/',
          component: path.resolve(`src/templates/index.js`),
          context: _context,
        });
        // Create 404 Page
        createPage({
          path: '/404.html',
          component: path.resolve(`src/templates/404.js`),
          context: _context,
        });
      } else {
        createPage({
          path: rootPath(language),
          component: path.resolve(`src/templates/index.js`),
          context,
        });
      }
      // Show Pages
      STATIC_PAGE_LIST.map(page => {
        graphql(queries.staticPageQuery, {templateKey: page, language}).then(
          result => {
            const [post] = result.data.allMarkdownRemark.nodes;
            createStaticPage(create(createPage))(post)(context);
          },
        );
      });
      createPostShowPage(create(createPage))(posts, rows)({
        pickupDisabled: true,
        pickup,
        ...context,
      });

      // Index Pages
      const _context = {
        pickup,
        ...context,
      };
      createMonthArchivePage(createPage)(context.layout.archiveByMonth)(
        _context,
      );
      createPostsIndexPage(createPage)(posts.length)(_context);
      categories.map(category => {
        graphql(queries.categoryQuery, {category, language}).then(result => {
          const posts = result.data.allMarkdownRemark.nodes;
          createCategoryShowPage(createPage)(category)(posts.length)(_context);
        });
      });
      tags.map(tag => {
        graphql(queries.tagQuery, {tag, language}).then(result => {
          const posts = result.data.allMarkdownRemark.nodes;
          createTagShowPage(createPage)(tag)(posts.length)(_context);
        });
      });
      return;
    }),
  );
};

exports.onCreateNode = async ({
  node,
  actions,
  store,
  cache,
  createNodeId,
  getNode,
}) => {
  const {createNode, createNodeField} = actions;
  fmImagesToRelative(node); // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({node, getNode});
    if (node.frontmatter.templateKey === 'blog-post') {
      const thumbnailUrl = isProduction ? meta.images.url + node.frontmatter.thumbnail : dummyThumbnail;
      try {
        const fileNode = await createRemoteFileNode({
            url: thumbnailUrl,
            parentNodeId: node.id,
            store,
            cache,
            createNode,
            createNodeId,
          });
        if (fileNode) {
          node.thumbnail___NODE = fileNode.id;
        }
      } catch (e) {
        console.error(e);
      }
    }
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

exports.onCreateWebpackConfig = ({stage, rules, loaders, plugins, actions}) => {
  actions.setWebpackConfig({
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
    resolve: {
      alias: {
        config: path.resolve(__dirname, 'config'),
        assets: path.resolve(__dirname, 'src/assets'),
        components: path.resolve(__dirname, 'src/components'),
        lib: path.resolve(__dirname, 'src/lib'),
        pages: path.resolve(__dirname, 'src/pages'),
        templates: path.resolve(__dirname, 'src/templates'),
        locales: path.resolve(__dirname, 'src/locales'),
      },
    },
  });
};
