<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-v-component
      heading="Orders"
      link="components/simple-tables"
    />

    <div class="py-3" />

    <base-material-card
      icon="mdi-clipboard-text"
      title="AtomicDEX Orders"
      class="px-5 py-3"
    >
      <v-simple-table>
        <thead>
          <tr>
            <th class="primary--text">
              Market Pair
            </th>
            <th class="primary--text">
              Status
            </th>
            <th class="primary--text">
              Order Price
            </th>
            <th class="primary--text">
              Amount
            </th>
            <th class="primary--text">
              Value
            </th>
            <th class="text-right primary--text">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td><a href="#">RICK/MORTY</a></td>
            <td>Not implemented</td>
            <td>2.5</td>
            <td>4</td>
            <td>0</td>
            <td class="text-right">
              <v-chip
                class="ma-2"
                color="red"
                dark
                @click="cancelOrder()"
              >
                <v-icon left>
                  mdi-server-minus
                </v-icon>Cancel
              </v-chip>
            </td>
          </tr>

          <tr>
            <td><a href="#">KMD/DOGE</a></td>
            <td>Not implemented</td>
            <td>287.5</td>
            <td>3</td>
            <td>$1.83</td>
            <td class="text-right">
              <v-chip
                class="ma-2"
                color="red"
                dark
                @click="cancelOrder()"
              >
                <v-icon left>
                  mdi-server-minus
                </v-icon>Cancel
              </v-chip>
            </td>
          </tr>

          <tr>
            <td><a href="#">KMD/RICK</a></td>
            <td>Not implemented</td>
            <td>300</td>
            <td>0.5</td>
            <td>0</td>
            <td class="text-right">
              <v-chip
                class="ma-2"
                color="red"
                dark
                @click="cancelOrder()"
              >
                Cancel
              </v-chip>
            </td>
          </tr>

          <tr>
            <td><a href="#">KMD/CHIPS</a></td>
            <td>Not implemented</td>
            <td>9.25</td>
            <td>3</td>
            <td>$1.86</td>
            <td class="text-right">
              <v-chip
                class="ma-2"
                color="red"
                dark
                @click="cancelOrder()"
              >
                Cancel
              </v-chip>
            </td>
          </tr>

          <tr>
            <td><a href="#">VRSC/CHIPS</a></td>
            <td>Not implemented</td>
            <td>1.05</td>
            <td>3</td>
            <td>$0.56</td>
            <td class="text-right">
              <v-chip
                class="ma-2"
                color="red"
                dark
                @click="cancelOrder('uuid456')"
              >
                Cancel
              </v-chip>
            </td>
          </tr>

          <tr>
            <td><a href="#">VRSC/DGB</a></td>
            <td>Not implemented</td>
            <td>12.8</td>
            <td>3</td>
            <td>$0.56</td>
            <td class="text-right">
              <v-chip
                class="ma-2"
                color="red"
                dark
                @click="cancelOrder('uuid1234')"
              >
                Cancel
              </v-chip>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </base-material-card>
  </v-container>
</template>
<script>
  import { EventBus } from '../../../event-bus.js'
  import mm2 from '../components/lib/mm2MiddlewareClient.js'

  export default {
    // props: ['pageProps'],
    data () {
      return {
        wallets: [],
        hideZero: false,
        hideZeroDisable: true,
        tidyMarketOrders: [{ uuid: 'test' }],
      }
    },
    computed: {
      fundedwallets () {
        const result = {}
        for (const i in this.wallets) {
          // TODO when electrum wallet not available, still displays ticker/row
          if (this.wallets[i].balance === '0' || this.wallets[i].balance === '' || this.wallets[i].balance === null) {
            continue
          } else {
            result[i] = this.wallets[i]
          }
        }
        return result
      },
    },
    watch: {
      wallets: {
        deep: true,
        handler (newval, oldval) {
          this.updateBalances()
        },
      },
    },
    created () {
      EventBus.$on('initWallets', wallets => {
        console.log('Tables -> initWallets')
        this.wallets = wallets
      })
    },
    methods: {
      // emitClickEvent () {
      cancelOrder (uuid = 'test') {
        // Send the event on a channel (requestCancelOrder) with a payload (the uuid)
        EventBus.$emit('requestCancelOrder', uuid)
      },
      updateBalances: function () {
        console.log('Updating balances')
        this.hideZeroDisable = true
        const lastticker = this.wallets[this.wallets.length - 1].ticker
        this.wallets.forEach(function (item, index) {
          // console.log('Updating [' + index + ']' + item.ticker)
          mm2.getBalance(item)
            .then(response => {
              this.wallets[index].balance = item.balance
              //          console.log("202006:" + JSON.stringify(this.wallets[index], null, 2))
              if (lastticker === item.ticker) {
                console.log('All updated')
                this.hideZeroDisable = false
              }
            })
            .catch(function (e) {
              console.log('update balance error' + e)
            })
        }.bind(this))
        this.$forceUpdate()
      // this.hideZeroDisable = false
      },
    },
  }
</script>
