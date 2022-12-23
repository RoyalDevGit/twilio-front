/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv')
const compose = require('just-compose')
const withPWAPlugin = require('next-pwa')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE_BUNDLE === 'true',
})
const intercept = require('intercept-stdout')

const { i18n } = require('./next-i18next.config')
const runtimeCaching = require('./runtimeCaching')

const { parsed: envVariables } = dotenv.config()

const publicEnvVariables = [
  'NODE_ENV',
  'API_URL',
  'CONTENT_FILES_URL',
  'VIDEO_ASSETS_URL',
  'ERROR_COOKIE_NAME',
  'ERROR_COOKIE_SECURE',
  'OAUTH_STATE_COOKIE_NAME',
  'OAUTH_COOKIE_SECURE',
  'COMMENT_REPLY_DEPTH',
  'DRAWER_STATE_COOKIE',
  'STRIPE_PUBLISHABLE_KEY',
  'SESSION_ALLOWED_EARLY_ARRIVAL_DURATION',
  'UPCOMING_SESSION_DURATION',
  'NOTICE_PERIOD_MIN',
  'NOTICE_PERIOD_MAX',
  'NEW_RELIC_BROWSER_ENABLED',
  'GTM_ID',
  'AWS_REGION',
  'MESSAGE_SIZE_LIMIT',
  'EXTEND_SESSION_PROMPT_WINDOW_BEGIN',
  'EXTEND_SESSION_PROMPT_WINDOW_END',
  'ALLOW_CONSUMER_EXTEND_SESSION',
  'POST_SESSION_MESSAGING_RESTRICTION_DURATION',
  'FAILED_SESSION_PAYMENT_AUTOMATIC_CANCELLATION_WINDOW',
  'USER_COOKIE_NAME',
  'EXPERT_COOKIE_NAME',
]

// Safely ignore recoil warning messages in dev (triggered by HMR): https://github.com/facebookexperimental/Recoil/issues/733
// Another ticket was created to determine if we need to use recoil
// Issues like this don't inspire confidence
function interceptStdout(text) {
  if (text.includes('Duplicate atom key')) {
    return ''
  }
  return text
}

if (process.env.NODE_ENV === 'development') {
  intercept(interceptStdout)
}

// Load all env variables into the serverRuntimeConfig
const publicRuntimeConfig = {}
publicEnvVariables.forEach((key) => {
  publicRuntimeConfig[key] = process.env[key]
})

// Load all env variables into the serverRuntimeConfig
const serverRuntimeConfig = {}
Object.entries(process.env).forEach(([key, value]) => {
  serverRuntimeConfig[key] = value
})

if (envVariables) {
  Object.entries(envVariables).forEach(([key, value]) => {
    serverRuntimeConfig[key] = value
  })
}

const plugins = []

const imageDomains = []

const contentFilesUrl = serverRuntimeConfig['CONTENT_FILES_URL']
if (contentFilesUrl) {
  const url = new URL(contentFilesUrl)
  imageDomains.push(url.hostname)
}
const videoAssetsUrl = serverRuntimeConfig['VIDEO_ASSETS_URL']
if (contentFilesUrl) {
  const url = new URL(videoAssetsUrl)
  imageDomains.push(url.hostname)
}

let config = {
  publicRuntimeConfig,
  serverRuntimeConfig,
  i18n,
  images: {
    disableStaticImages: true,
    domains: imageDomains,
  },
  async headers() {
    return [
      {
        // This works, and returns appropriate Response headers:
        source: '/(.*).jpg',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=604800, s-maxage=604800, stale-while-revalidate=604800',
          },
        ],
      },
      {
        // This works, and returns appropriate Response headers:
        source: '/(.*).png',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=604800, s-maxage=604800, stale-while-revalidate=604800',
          },
        ],
      },
    ]
  },
  webpack: (config) => {
    config.resolve.modules.push('src')
    config.resolve.modules.push('server')

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  compiler: {
    emotion: true,
  },
}

if (process.env.ANALYZE_BUNDLE === 'true') {
  plugins.push(withBundleAnalyzer)
}

if (process.env.ENABLE_PWA === 'true') {
  const withPWA = withPWAPlugin({
    dest: 'public',
    runtimeCaching,
  })
  plugins.push(withPWA)
}

if (plugins.length) {
  const withPlugins = compose(...plugins)
  config = withPlugins(config)
}

module.exports = config
