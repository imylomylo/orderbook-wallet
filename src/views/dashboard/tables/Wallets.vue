<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-v-component
      heading="Wallets"
      link="components/simple-tables"
    />

    <base-material-card
      icon="mdi-clipboard-text"
      title="Wallets (AtomicDEX)"
      class="px-5 py-3"
    >
      <span class="ma-5 mt-11"><v-checkbox
        v-model="hideZero"
        :disabled="hideZeroDisable"
        label="Hide Zero Balance"
      /></span>
      <v-chip
        class="ma-2"
        color="purple"
        :disabled="hideZeroDisable"
        outlined
        @click="updateBalances()"
      >
        <!--        <v-icon left>mdi-server-plus</v-icon>-->
        <template v-if="hideZeroDisable">
          Loading {{ wallets.length }} Wallets
        </template>
        <template v-else>
          Refresh
        </template>
      </v-chip>

      <v-simple-table>
        <thead>
          <tr>
            <th class="primary--text">
              TICKER
            </th>
            <th class="primary--text">
              Balance
            </th>
            <th class="primary--text">
              Address
            </th>
            <th class="primary--text">
              Orders
            </th>
            <th class="text-right primary--text">
              Actions
            </th>
          </tr>
        </thead>

        <tbody v-if="wallets">
          <template v-if="hideZero">
            <tr
              v-for="row in fundedwallets"
              :key="row.ticker"
            >
              <td>{{ row.ticker }}</td>
              <td>{{ row.balance }}</td>
              <td>{{ row.address }}</td>
              <td>abc</td>
              <td>def</td>
            </tr>
          </template>
          <template v-else>
            <tr
              v-for="row in wallets"
              :key="row.ticker"
            >
              <td>{{ row.ticker }}</td>
              <td>{{ row.balance }}</td>
              <td>{{ row.address }}</td>
              <td>abc</td>
              <td>def</td>
            </tr>
          </template>
        </tbody>
        <tbody v-else>
          <tr>
            <td>BTC</td>
            <td>0</td>
            <td>12TLFf9VcrAXxp5sq4ipSBJxCP25y3Hrjn</td>
            <td>3</td>
            <td class="text-right">
              $36,738
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
