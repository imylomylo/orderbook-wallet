<template>
  <v-content>
    <router-view />

    <dashboard-core-footer />
  </v-content>
</template>

<script>
  import { EventBus } from '../../../../event-bus.js'
  import mm2Middleware from '../lib/mm2Middleware.js'

  // from: https://forum.vuejs.org/t/pass-props-for-different-components-via-one-router-view/1489/2
  // passing computed props depending on route
  // alternative would be to pass in through router.js possibly
  export default {
    name: 'DashboardCoreView',
    components: {
      DashboardCoreFooter: () => import('./Footer'),
    },
    asyncComputed: {
      pageProps () {
        if (this.$route.name === 'Dashboard') { return { something: 'dashboard page props' } }
        if (this.$route.name === 'Wallets') {
          mm2Middleware.initWallets().then(response => {
            let wallets = {}
            wallets = response.data.result
            console.log('View -> init wallets')
            EventBus.$emit('initWallets', wallets)
            return { something: 'wallets loaded' }
          }).catch(reason => {
            return { something: 'error' }
          })
        }
        if (this.$route.name === 'Orders') {
          mm2Middleware.getMyOrders().then(response => {
            let myOrders = []
            console.log('View => init orders')
            // because working with an object of objects in js sucks, convert to array
            myOrders = Object.values(response.data.result.maker_orders)
            EventBus.$emit('initOrders', myOrders)
            return { something: 'orders loaded' }
          }).catch(reason => {
            return { something: 'error' }
          })
        }
        if (this.$route.name === 'Recent Swaps') {
          mm2Middleware.getRecentSwaps().then(response => {
            let recentSwaps = []
            recentSwaps = response.data.result
            EventBus.$emit('initRecentSwaps', recentSwaps)
            return { something: 'recent swaps loaded' }
          }).catch(reason => {
            return { something: 'error' }
          })
        }
        if (this.$route.name === 'Orderbook') {
          mm2Middleware.getMarket('KMD', 'BTC').then(response => {
            const marketdataraw = response.data
            EventBus.$emit('initMarket', marketdataraw)
            return { something: 'market raw orderbook loaded' }
          }).catch(reason => {
            return { something: 'error' }
          })
        } else { return { something: 'else' } }
      },
    },
    created () {
      EventBus.$on('requestCancelOrder', uuid => {
        console.log('A cancel request for uuid: ' + uuid)
      })
    },
  }
</script>
