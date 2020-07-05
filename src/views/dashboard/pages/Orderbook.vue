<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <base-material-card
          color="warning"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Asks
            </div>

            <div class="subtitle-1 font-weight-light">
              The sellers
            </div>
          </template>
          <v-card-text>
            <v-data-table
              dense
              :sort-by="['price']"
              :sort-desc="[false]"
              :items-per-page="5"
              :headers="asksHeaders"
              :items="marketOrders.asks"
            >
              <!-- Rounding from https://www.jacklmoore.com/notes/rounding-in-javascript/ -->
              <!-- Better to move to computed function for maintainability/non-repetitive -->
              <template v-slot:item.price="{ item }">
                {{ Number(Math.round(item.price+'e8')+'e-8') }}
              </template>

              <template
                v-slot:item.maxvolume="{ item }"
              >
                {{ Number(Math.round(item.maxvolume+'e8')+'e-8') }}
              </template>
              <template
                v-slot:item.relamount="{ item }"
              >
                {{ Number(Math.round(item.price*item.maxvolume+'e8')+'e-8') }}
              </template>
            </v-data-table>
          </v-card-text>
        </base-material-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <base-material-card
          color="warning"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Bids
            </div>

            <div class="subtitle-1 font-weight-light">
              The buyers
            </div>
          </template>
          <v-card-text>
            <v-data-table
              dense
              :sort-by="['price']"
              :sort-desc="[true]"
              :items-per-page="5"
              :headers="bidsHeaders"
              :items="marketOrders.bids"
            >
              <!-- Rounding from https://www.jacklmoore.com/notes/rounding-in-javascript/ -->
              <!-- Better to move to computed function for maintainability/non-repetitive -->
              <template v-slot:item.price="{ item }">
                {{ Number(Math.round(item.price+'e8')+'e-8') }}
              </template>
              <template
                v-slot:item.baseamount="{ item }"
              >
                {{ Number(Math.round(item.maxvolume/item.price+'e8')+'e-8') }}
              </template>
              <template
                v-slot:item.maxvolume="{ item }"
              >
                {{ Number(Math.round(item.maxvolume+'e8')+'e-8') }}
              </template>
            </v-data-table>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { EventBus } from '../../../event-bus.js'

  export default {
    data () {
      return {
        asksHeaders: [
          {
            text: 'Price (rel)',
            align: 'left',
            sortable: true,
            value: 'price',
          },
          { text: 'Amount (base)', align: 'left', value: 'maxvolume' },
          { text: 'Total (rel)', align: 'right', value: 'relamount' },
        ],
        bidsHeaders: [
          {
            text: 'Price (rel)',
            align: 'left',
            sortable: true,
            value: 'price',
          },
          { text: 'Amount (base)', align: 'left', value: 'baseamount' },
          { text: 'Total (rel)', align: 'right', value: 'maxvolume' },
        ],
        marketdataraw: {},
        marketOrders: [],
      }
    },
    created () {
      EventBus.$on('initMarket', marketdataraw => {
        this.marketdataraw = marketdataraw
        this.marketOrders = marketdataraw
        this.marketOrders.asks = this.groupByPrice(marketdataraw.asks, 'price')
        this.marketOrders.bids = this.groupByPrice(marketdataraw.bids, 'price')
      })
    },
    methods: {
      groupByPrice: function (raw, groupBy) {
        // from https://stackoverflow.com/questions/21776389/javascript-object-grouping
        let i = 0
        let val
        let index
        const values = []
        const result = []
        const interim = []
        for (; i < raw.length; i++) { // for every "ask" or "bid" in the respective arrays
          val = raw[i][groupBy] // this object val for the groupBy attribute
          index = values.indexOf(val)// has this val already been processed in a previous iteration
          if (index > -1) {
            // this matches an already processed groupBy item
            interim[index].push(raw[i])
          } else {
            // first val for this groupBy attribute
            values.push(val)
            interim.push([raw[i]])
          }
        }
        // console.log(JSON.stringify(interim, null, 4))
        // we now have an array of arrays with orders of same price
        for (i = 0; i < interim.length; i++) {
          // each array, reduce to 1 object
          let orderTemplate = {}
          for (let j = 0; j < interim[i].length; j++) {
            if (j === 0) {
              //            console.log("First grouped price to add maxvolume: " + interim[i][j].price)
              orderTemplate = interim[i][j]
              orderTemplate.address = ''
              orderTemplate.pubkey = ''
              // for highlighting my orders in the OB, set example with prices within these ranges to activate
              //            if( orderTemplate.price && orderTemplate.price > 8 || orderTemplate.price < 0.05 ){
              //               orderTemplate.myOrder = true
              //            }

              console.log('Looking for match in MOTM: ' + orderTemplate.uuid)
              const tmpz = this.myOrdersThisMarket.filter(x => x.uuid === orderTemplate.uuid)
              //            console.log(JSON.stringify(tmpz, null, 1) + " AND " + orderTemplate)
              if (tmpz[0] !== undefined) { // ugly but works
                console.log('UUID Match Found')
                orderTemplate.myOrder = true
              }
            } else {
              orderTemplate.maxvolume += interim[i][j].maxvolume
            }
          }
          result.push(orderTemplate)
        }
        // console.log(JSON.stringify(result, null, 4))
        return result
      },
    },
  }
</script>
