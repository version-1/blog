export const isEnv = (env) => process.env.NODE_ENV === env
export const isProduction = isEnv('production')
export const isDevelopment = isEnv('development')
