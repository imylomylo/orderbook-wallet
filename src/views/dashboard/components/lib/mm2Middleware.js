import mm2MiddlewareClient from './mm2MiddlewareClient.js'

export function initWallets () {
  return mm2MiddlewareClient.getEnabledCoins()
}

export function getMyOrders () {
  return mm2MiddlewareClient.getMyOrders()
}

export function getRecentSwaps () {
  return mm2MiddlewareClient.recentSwaps()
}

export function getMarket (base, rel) {
  return mm2MiddlewareClient.getMarket(base, rel)
}

export default {
  initWallets,
  getMyOrders,
  getRecentSwaps,
  getMarket,
}
