require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'esnext',
    esModuleInterop: true,
    resolveJsonModule: true,
  }
})

const path = require('path')
const gatsbyNode = require('./gatsby-node/index')
exports.createPages = gatsbyNode.createPages

exports.onCreateNode = gatsbyNode.onCreateNode
exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions
}) => {
  actions.setWebpackConfig({
    node: {
      fs: 'empty'
    },
    resolve: {
      alias: {
        config: path.resolve(__dirname, 'config'),
        assets: path.resolve(__dirname, 'src/assets'),
        components: path.resolve(__dirname, 'src/components'),
        atoms: path.resolve(__dirname, 'src/components/atoms'),
        molecules: path.resolve(__dirname, 'src/components/molecules'),
        organisms: path.resolve(__dirname, 'src/components/organisms'),
        hooks: path.resolve(__dirname, 'src/hooks'),
        context: path.resolve(__dirname, 'src/context'),
        lib: path.resolve(__dirname, 'src/lib'),
        pages: path.resolve(__dirname, 'src/pages'),
        templates: path.resolve(__dirname, 'src/templates'),
        locales: path.resolve(__dirname, 'src/locales')
      }
    }
  })
}
