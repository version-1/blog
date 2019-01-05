import { meta } from '../../config/constants'
export const isEnv = (env) => process.env.NODE_ENV === env
export const isProduction = isEnv('production')
export const isStrictProduction = isProduction && isProductionHost
export const isDevelopment = isEnv('development')


export const isProductionHost = function() {
  const hostname = typeof window !== 'undefined' && window.location.host
  return meta.hostname === hostname
}()
