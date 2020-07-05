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
            <td>FAKE DATA ROW</td>
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

          <tr
            v-for="row in myOrders"
            :key="row.uuid"
          >
            <td><a href="#">{{ row.base }} / {{ row.rel }}</a></td>
            <td>Not implemented</td>
            <td>{{ row.price }}</td>
            <td>{{ row.max_base_vol }}</td>
            <td>Not implemented</td>
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
        </tbody>
      </v-simple-table>
    </base-material-card>
  </v-container>
</template>
<script>
  import { EventBus } from '../../../event-bus.js'

  export default {
    // props: ['pageProps'],
    data () {
      return {
        wallets: [], // can remove
        myOrders: [],
        tidyMarketOrders: [{ uuid: 'test' }],
      }
    },
    created () {
      EventBus.$on('initOrders', myOrders => {
        console.log('Tables -> initOrders')
        this.myOrders = myOrders
      })
    },
    methods: {
      // emitClickEvent () {
      cancelOrder (uuid = 'test') {
        // Send the event on a channel (requestCancelOrder) with a payload (the uuid)
        EventBus.$emit('requestCancelOrder', uuid)
      },
    },
  }
</script>
