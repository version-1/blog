const _ = require('lodash');
const path = require('path');
const {createFilePath} = require('gatsby-source-filesystem');
const {fmImagesToRelative} = require('gatsby-remark-relative-images');
const {routes} = require('./config/constants');

// Constants
const PER_PAGE = 18;

const CATEGORY_LIST = [
  'column',
  'cryptocurrency-blockchain',
  'design',
  'engineering',
  'for-beginner',
  'freelance',
  'rails',
  'react',
  'travel',
];

const validateCategoryList = (node, categories) => {
  const diff = _.difference(categories, CATEGORY_LIST).length > 0;
  if (diff.length > 0) {
    console.err('category not found', diff, node);
    throw new Error()
  }
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

const createPostShowPage = createPage => posts => {
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
      },
    });
  });
};

const createPostsIndexPage = createPage => totalCount => {
  const _path = [routes.root, routes.post].join('/');
  buildPaginationPages(createPage)()(_path, 'posts/index', totalCount);
};

const createCategoryShowPage = createPage => category => totalCount => {
  const _path = [routes.root, routes.category, _.kebabCase(category)].join('/');
  buildPaginationPages(createPage)()(_path, 'categories', totalCount, {
    category,
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
    allMarkdownRemark(limit: 1000) {
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
  const {createPage} = actions;

  return graphql(queryIndex).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    // Collect Data
    const posts = result.data.allMarkdownRemark.edges;
    const categories = collectCategories(posts);

    // Create Pages
    createPostShowPage(createPage)(posts);
    createPostsIndexPage(createPage)(posts.length);
    categories.map(category => {
      graphql(categoryQuery, {category}).then(result => {
        const posts = result.data.allMarkdownRemark.edges;
        createCategoryShowPage(createPage)(category)(posts.length);
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
