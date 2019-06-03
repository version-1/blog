const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');
const {createFilePath} = require('gatsby-source-filesystem');
const {fmImagesToRelative} = require('gatsby-remark-relative-images');
const {routes, meta, constants} = require('./config/constants');
const fs = require(`fs-extra`);
const moment = require('moment');

const {validateCategoryList, validateTagList} = require('./node/validation');
const {fetch} = require('./node/breadcrumbs');
const {fetchPv} = require('./node/pageview');
const {rating} = require('./node/related-post');
const queries = require('./node/queries.js');

// Constants
const PER_PAGE = constants.per;
const STATIC_PAGE_LIST = constants.pages;

const genShowPath = edge => {
  const {language, slug} = edge.node.frontmatter;
  const _path = slug || edge.fields.slug;
  return genPath(language, _path);
};

const genPath = (language, slug) => {
  if (language && language !== 'ja') {
    return ['/', language, '/', slug].join('').replace(/\/\//g, '/');
  }
  return slug;
};

const withAMP = createPage => params => {
  const {path: _path, component, context = {}} = params;
  const ampPath = _path + '/amp';
  const template = path.parse(component);
  const ampTemplate = component.replace(
    template.base,
    [template.name, '.amp', template.ext].join(''),
  );
  const baseUrl = [meta.siteUrl, _path].join('');
  createPage({
    ...params,
    context: {
      ...context,
      baseUrl,
    },
  });
  createPage({
    ...params,
    path: ampPath,
    component: ampTemplate,
    context: {
      ...context,
      amp: true,
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
    const id = edge.node.id;
    const {tags, categories, slug, templateKey} = edge.node.frontmatter;
    const breadcrumbs = fetch(context.language);
    const _breadcrumbs = [
      ...context.layout.breadcrumbs,
      breadcrumbs.categories(categories[0]),
    ];
    validateCategoryList(edge.node, categories);
    validateCategoryList(edge.node, tags);
    const relatedRatings = rating(posts, edge, pageviews);
    const _path = genShowPath(edge);
    createPage({
      path: _path,
      categories: categories,
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
  const {id} = page.node;
  const {templateKey} = page.node.frontmatter;
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
        posts.map(edge => {
          if (_.get(edge, `node.frontmatter.${key}`)) {
            return edge.node.frontmatter[key];
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

exports.createPages = async ({actions, graphql}) => {
  graphql(queries.jaIndexQuery)
    .then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()));
        return Promise.reject(result.errors);
      }
      return result;
    })
    .then(result => {
      // Collect Data
      const posts = result.data.allMarkdownRemark.edges;
      const categories = collectCategories(posts);
      const tags = collectTags(posts).filter(tag => tag !== 'dummy');
      const archiveByMonth = posts.reduce((acc, item) => {
        const key = moment(item.node.frontmatter.createdAt).format('YYYY/MM');
        return {...acc, [key]: [...(acc[key] || []), item.node.id]};
      }, {});

      const breadcrumbs = fetch('ja');
      const context = {
        language: 'ja',
        layout: {archiveByMonth, breadcrumbs: [breadcrumbs.top]},
      };
      console.log('posts :', posts.length);
      console.log('categories :', categories.length);
      console.log(categories);
      console.log('tags :', tags.length);
      console.log(tags);
      return {posts, tags, categories, context};
    })
    .then(async ({posts, tags, categories, context}) => {
      const {createPage} = actions;
      const pv = await fetchPv();
      const {rows} = pv.reports[0].data;
      const populars = rows.slice(0, 6).map(row => row.dimensions[0]);
      graphql(queries.popularPostQuery, {populars}).then(res => {
        createPage({
          path: '/',
          component: path.resolve(`src/templates/index.js`),
          context: {
            popPosts: res,
            ...context,
          },
        });
        // Create 404 Page
        createPage({
          path: '/404.html',
          component: path.resolve(`src/templates/404.js`),
          context: {
            popPosts: res,
            ...context,
          },
        });
      });
      // Create Pages
      STATIC_PAGE_LIST.map(page => {
        graphql(queries.staticPageQuery, {templateKey: page}).then(result => {
          const [post] = result.data.allMarkdownRemark.edges;
          createStaticPage(withAMP(createPage))(post)(context);
        });
      });
      createMonthArchivePage(createPage)(context.layout.archiveByMonth)(
        context,
      );
      createPostShowPage(withAMP(createPage))(posts, rows)(context);
      createPostsIndexPage(createPage)(posts.length)(context);
      categories.map(category => {
        graphql(queries.categoryQuery, {category}).then(result => {
          const posts = result.data.allMarkdownRemark.edges;
          createCategoryShowPage(createPage)(category)(posts.length)(context);
        });
      });
      tags.map(tag => {
        graphql(queries.tagQuery, {tag}).then(result => {
          const posts = result.data.allMarkdownRemark.edges;
          createTagShowPage(createPage)(tag)(posts.length)(context);
        });
      });
    });
  const result = await graphql(queries.enIndexQuery);
  if (result.errors) {
    result.errors.forEach(e => console.error(e.toString()));
  }
  const posts = result.data.allMarkdownRemark.edges;
  const categories = collectCategories(posts);
  const tags = collectTags(posts).filter(tag => tag !== 'dummy');
  const archiveByMonth = posts.reduce((acc, item) => {
    const key = moment(item.node.frontmatter.createdAt).format('YYYY/MM');
    return {...acc, [key]: [...(acc[key] || []), item.node.id]};
  }, {});
  const rows = [];

  const breadcrumbs = fetch('en');
  const context = {
    language: 'en',
    layout: {archiveByMonth, breadcrumbs: [breadcrumbs.top]},
  };
  const {createPage} = actions;
  createPage({
    path: '/en',
    component: path.resolve(`src/templates/index.js`),
    context,
  });
  STATIC_PAGE_LIST.map(page => {
    graphql(queries.staticPageQuery, {templateKey: page}).then(result => {
      const [post] = result.data.allMarkdownRemark.edges;
      createStaticPage(withAMP(createPage))(post)(context);
    });
  });
  createMonthArchivePage(createPage)(context.layout.archiveByMonth)(context);
  createPostShowPage(withAMP(createPage))(posts, rows)(context);
  createPostsIndexPage(createPage)(posts.length)(context);
  categories.map(category => {
    graphql(queries.categoryQuery, {category}).then(result => {
      const posts = result.data.allMarkdownRemark.edges;
      createCategoryShowPage(createPage)(category)(posts.length)(context);
    });
  });
  tags.map(tag => {
    graphql(queries.tagQuery, {tag}).then(result => {
      const posts = result.data.allMarkdownRemark.edges;
      createTagShowPage(createPage)(tag)(posts.length)(context);
    });
  });
  result;
};

exports.onCreateNode = ({node, actions, getNode}) => {
  const {createNodeField} = actions;
  fmImagesToRelative(node); // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({node, getNode});
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
      console: true,
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
