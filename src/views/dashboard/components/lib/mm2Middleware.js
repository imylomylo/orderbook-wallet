import mm2MiddlewareClient from './mm2MiddlewareClient.js'

export function initWallets () {
  return mm2MiddlewareClient.getEnabledCoins()
}

export default {
  initWallets,
}
