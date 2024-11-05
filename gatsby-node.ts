import path from 'path'
import { createPages as createBlogPages } from './src/node/pages/blog'

export const createPages = async (params: any) => {
  await createBlogPages(params)
}
//
export const onCreateWebpackConfig = ({ actions }: any) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        fs: false
      },
      alias: {
        configs: path.resolve(__dirname, 'src/configs'),
        assets: path.resolve(__dirname, 'src/assets'),
        lib: path.resolve(__dirname, 'src/lib'),
        templates: path.resolve(__dirname, 'src/templates'),
        components: path.resolve(__dirname, 'src/components'),
        constants: path.resolve(__dirname, 'src/constants'),
        services: path.resolve(__dirname, 'src/services')
      }
    }
  })
}
