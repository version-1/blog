export const isProductionHost = function() {
  // FIXME 一時的に全てtrue
  return true
  // const hostname = typeof window !== 'undefined' && window.location.host
  // return meta.hostname === hostname
}()
export const isEnv = (env) => process.env.NODE_ENV === env
export const isProduction = isEnv('production')
export const isStrictProduction = isProduction && isProductionHost
export const isDevelopment = isEnv('development')

const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL

export const env = {
  slackWebhookUrl
}

