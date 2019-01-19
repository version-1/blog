const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');
const {createFilePath} = require('gatsby-source-filesystem');
const {fmImagesToRelative} = require('gatsby-remark-relative-images');
const {routes, meta, constants} = require('./config/constants');
const fs = require(`fs-extra`);
const moment = require('moment');

// Constants
const PER_PAGE = constants.per;
const CATEGORY_LIST = constants.categories;
const STATIC_PAGE_LIST = constants.pages;

const validateCategoryList = (node, categories) => {
  const diff = _.difference(categories, CATEGORY_LIST).length > 0;
  if (diff.length > 0) {
    console.error('category not found', diff, node);
    throw new Error();
  }
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
      ...params.context,
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

const createPostShowPage = createPage => posts => context => {
  posts.forEach(edge => {
    const id = edge.node.id;
    const {categories, slug, templateKey} = edge.node.frontmatter;
    validateCategoryList(edge.node, categories);
    createPage({
      path: slug || edge.node.fields.slug,
      categories: categories,
      component: path.resolve(`src/templates/${String(templateKey)}.js`),
      context: {
        id,
        ...context
      },
    });
  });
};

const createPostsIndexPage = createPage => totalCount => context => {
  const _path = [routes.root, routes.post].join('/');
  buildPaginationPages(createPage)()(_path, 'posts/index', totalCount, context);
};

const createCategoryShowPage = createPage => category => totalCount => context => {
  const _path = [routes.root, routes.category, _.kebabCase(category)].join('/');
  buildPaginationPages(createPage)()(_path, 'categories', totalCount, {
    category,
    ...context
  });
};

const createMonthArchivePage = createPage => archives => context => {
  Object.keys(archives).forEach(key => {
    const _path = [routes.root, key].join('/');
    const totalCount = archives[key].length
    buildPaginationPages(createPage)()(_path, 'months', totalCount, {
      month: key,
      ids: archives[key],
      ...context
    });
  })
};

const createStaticPage = createPage => page => context => {
  const {id} = page.node;
  const {templateKey} = page.node.frontmatter;
  createPage({
    path: '/' + templateKey,
    component: path.resolve(`src/templates/${String(templateKey)}.js`),
    context: {
      id,
      ...context
    },
  });
};

const collectCategories = posts => {
  return _.uniq(
    _.compact(
      _.flatten(
        posts.map(edge => {
          if (_.get(edge, `node.frontmatter.categories`)) {
            return edge.node.frontmatter.categories;
          }
        }),
      ),
    ),
  );
};

const queryIndex = `
  {
    allMarkdownRemark(
      limit: 1000,
      filter: {
        frontmatter: { templateKey: { eq: "blog-post" }}
      }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            slug
            categories
            templateKey
            createdAt
          }
        }
      }
    }
  }
`;

const popularPostQuery = `query popularPostQuery($populars: [String]) {
allMarkdownRemark(
      filter: {
        frontmatter: {slug: {in: $populars}}
      }
      limit: 6
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            slug
            thumbnail
            templateKey
            categories
            createdAt(formatString: "MMM DD, YYYY")
            updatedAt(formatString: "MMM DD, YYYY")
          }
        }
      }
    }
   }`;

const staticPageQuery = `
 query StaticPageQuery($templateKey: String) {
    allMarkdownRemark(
      limit: 1,
      filter: {
        frontmatter: { templateKey: { eq: $templateKey }}
      }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            templateKey
          }
        }
      }
    }
  }
`;

const categoryQuery = `
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 1000
      filter: {frontmatter: {categories: {in: [$category]}}}
    ) {
      totalCount
      edges {
        node {
          id
        }
      }
    }
  }
`;

exports.createPages = ({actions, graphql}) => {
  return graphql(queryIndex).then(result => {
    const {createPage} = actions;
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    // Collect Data
    const posts = result.data.allMarkdownRemark.edges;
    const categories = collectCategories(posts);
    const archiveByMonth = posts.reduce((acc, item) => {
      const key = moment(item.node.frontmatter.createdAt).format('YYYY/MM')
      return { ...acc, [key]: [...(acc[key] || []), item.node.id]}
    }, {});

    const context = {
      layout: { archiveByMonth }
    }

    graphql(popularPostQuery, {populars: constants.populars}).then(result => {
      // Create RootPage
      createPage({
        path: '/',
        component: path.resolve(`src/templates/index.js`),
        context: {
          popPosts: result,
          ...context
        },
      });
      // Create 404 Page
      createPage({
        path: '/404.html',
        component: path.resolve(`src/templates/404.js`),
        context: {
          popPosts: result,
          ...context
        },
      });
    });

    // Create Pages
    STATIC_PAGE_LIST.map(page => {
      graphql(staticPageQuery, {templateKey: page}).then(result => {
        const [post] = result.data.allMarkdownRemark.edges;
        createStaticPage(withAMP(createPage))(post)(context);
      });
    });
    createMonthArchivePage(createPage)(archiveByMonth)(context);
    createPostShowPage(withAMP(createPage))(posts)(context);
    createPostsIndexPage(createPage)(posts.length)(context);
    categories.map(category => {
      graphql(categoryQuery, {category}).then(result => {
        const posts = result.data.allMarkdownRemark.edges;
        createCategoryShowPage(createPage)(category)(posts.length)(context);
      });
    });
  });
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
