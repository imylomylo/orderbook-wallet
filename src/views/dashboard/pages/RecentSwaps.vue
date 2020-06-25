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
              New employees on 15th September, 2016
            </div>
          </template>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="items"
            />
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
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
        ],
      }
    },
  }
</script>
