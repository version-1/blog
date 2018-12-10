const _ = require('lodash');
const path = require('path');
const {createFilePath} = require('gatsby-source-filesystem');
const {fmImagesToRelative} = require('gatsby-remark-relative-images');

// Constants
const PER_PAGE = 20;

const createPostShowPage = createPage => posts => {
  posts.forEach(edge => {
    const id = edge.node.id;
    createPage({
      path: edge.node.frontmatter.slug || edge.node.fields.slug,
      categories: edge.node.frontmatter.categories,
      component: path.resolve(
        `src/templates/${String(edge.node.frontmatter.templateKey)}.js`,
      ),
      // additional data can be passed via context
      context: {
        id,
      },
    });
  });
};

const createPostsIndexPage = createPage => posts => {
  const totalPages = Math.ceil(posts.length / PER_PAGE);
  Array.from({length: totalPages}).forEach((dummy, currentPageIndex) => {
    createPage({
      path: currentPageIndex === 0 ? '/posts' : `/posts/${currentPageIndex + 1}`,
      component: path.resolve('./src/templates/posts/index.js'),
      context: {
        limit: PER_PAGE,
        skip: currentPageIndex * PER_PAGE,
      },
    });
  });
};

const createCategoryIndexPage = createPage => categories => {
  categories.forEach(category => {
    const _path = `/category/${_.kebabCase(category)}/`;
    createPage({
      path: _path,
      component: path.resolve(`src/templates/categories.js`),
      context: {
        category,
      },
    });
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

exports.createPages = ({actions, graphql}) => {
  const {createPage} = actions;

  return graphql(`
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
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    // Collect Data
    const posts = result.data.allMarkdownRemark.edges;
    const categories = collectCategories(posts);

    // Create Pages
    createPostShowPage(createPage)(posts);
    createPostsIndexPage(createPage)(posts);
    createCategoryIndexPage(createPage)(categories);
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
