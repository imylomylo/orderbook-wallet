<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <base-material-card
          color="warning"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Recent Swaps
            </div>

            <div class="subtitle-1 font-weight-light">
              This only fetches last 10 swap history for now
            </div>
          </template>
          <!--
This data table makes this really easy for sorting if required, just change the headers & items
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="items"
            />
          </v-card-text>
-->
          <div v-if="recentSwaps.swaps !== undefined && recentSwaps.swaps.length > 0">
            <div>
              <v-simple-table>
                <thead>
                  <tr>
                    <th class="text-left">
                      Type
                    </th>
                    <th class="text-left">
                      My Coin
                    </th>
                    <th class="text-left">
                      My Amount
                    </th>
                    <th class="text-left">
                      Other Coin
                    </th>
                    <th class="text-left">
                      Other Amount
                    </th>
                    <th class="text-left">
                      Trade UUID
                    </th>
                    <th class="text-left">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="row in recentSwaps.swaps"
                    :key="row.uuid"
                  >
                    <td>{{ row.type }}</td>
                    <td>{{ row.my_info.my_coin }}</td>
                    <td>{{ row.my_info.my_amount }}</td>
                    <td>{{ row.my_info.other_coin }}</td>
                    <td>{{ row.my_info.other_amount }}</td>
                    <td>{{ row.uuid }}</td>
                    <td>
                      <v-chip
                        class="ma-2"
                        color="blue"
                        dark
                        @click="showDetails(row.uuid)"
                      >
                        <v-icon left>
                          mdi-server-plus
                        </v-icon>Details
                      </v-chip>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </div>
          </div>
          <div v-else>
            Nothing to show yet
          </div>
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
        // below is if using data tables instead of simple tables, the following are needed
        asksHeaders: [
          {
            text: 'Price (rel)',
            align: 'left',
            sortable: true,
            value: 'price',
          },
          { text: 'Amount (base)', align: 'left', value: 'maxvolume' },
          { text: 'Total (rel))', align: 'right', value: 'relamount' },
        ],
        bidsHeaders: [
          {
            text: 'Price (rel)',
            align: 'left',
            sortable: true,
            value: 'price',
          },
          { text: 'Base Amount', align: 'left', value: 'baseamount' },
          { text: 'Can Cancel', align: 'right', value: 'maxvolume' },
        ],
        headers: [
          {
            sortable: false,
            text: 'Trade UUID',
            value: 'id',
          },
          {
            sortable: false,
            text: 'My COIN',
            value: 'name',
          },
          {
            sortable: false,
            text: 'My Amount',
            value: 'salary',
            align: 'right',
          },
          {
            sortable: false,
            text: 'Other COIN',
            value: 'country',
            align: 'right',
          },
          {
            sortable: false,
            text: 'Other Amount',
            value: 'city',
            align: 'right',
          },
        ],
        items: [
          {
            id: '7363ac42-ec9e-4669-88e6-c45fecbc6847',
            name: 'KMD',
            country: 'MORTY',
            city: '0.1',
            salary: '0.05',
          },
          {
            id: 'b0250c62-39d8-430a-8236-13b0887fe98a',
            name: 'KMD',
            country: 'MORTY',
            city: '0.1',
            salary: '0.5',
          },
          // above is for data tables instead of simple tables
        ],
        recentSwaps: [],
      }
    },
    created () {
      // store test works
      console.log('Recent swaps store test (wallets)' + JSON.stringify(this.$store.state.storewallets, null, 2))
      EventBus.$on('initRecentSwaps', recentSwaps => {
        console.log('page recent swaps -> Init Recent Swaps')
        this.recentSwaps = recentSwaps
      })
    },
  }
</script>
