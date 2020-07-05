<template>
  <v-container
    id="upgrade"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <base-material-card color="primary">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              About atomicDEX
            </div>

            <div class="subtitle-1 font-weight-light">
              Are you looking for more? Please check the official atomicDEX.io website
            </div>
          </template>

          <v-simple-table>
            <thead>
              <tr>
                <th />
                <th class="subheading font-weight-light text-center">
                  Komodo
                </th>
                <th class="subheading font-weight-light text-center">
                  Industry
                </th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr>
                <th class="text-left font-weight-light subtitle-1">
                  Security
                </th>
                <td>dPoW</td>
                <td>PoW, Trusted Validators</td>
              </tr>
              <tr>
                <th class="text-left font-weight-light subtitle-1">
                  Application Blockchains
                </th>
                <td>Antara</td>
                <td>Polkadot / Cosmos</td>
              </tr>
              <tr>
                <th class="text-left font-weight-light subtitle-1">
                  Launch Date
                </th>
                <td>2016</td>
                <td>2020 / 2019</td>
              </tr>
              <tr>
                <th class="text-left font-weight-light subtitle-1">
                  Cross Chain Atomic Swap DEX
                </th>
                <td>
                  <v-icon color="success">
                    mdi-check
                  </v-icon>
                </td>
                <td>
                  <v-icon color="error">
                    mdi-close
                  </v-icon>
                </td>
              </tr>
              <tr>
                <th class="text-left font-weight-light subtitle-1">
                  Open Source
                </th>
                <td>
                  <v-icon color="success">
                    mdi-check
                  </v-icon>
                </td>
                <td>
                  <v-icon color="error">
                    mdi-close
                  </v-icon>
                </td>
              </tr>
              <tr>
                <th />
                <td>Free</td>
                <td>All in one <b class="subheading">blockchain solutions</b></td>
              </tr>
              <tr>
                <th />
                <td>
                  <v-btn
                    color="grey"
                    disabled
                  >
                    More to come
                  </v-btn>
                </td>
                <td>
                  <v-btn
                    color="success"
                    target="_blank"
                    href="https://komodoplatform.com"
                  >
                    Go to komodoplatform.com
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'DashboardDashboard',
  }
</script>

<style lang="sass">
  #upgrade
    .v-data-table
      th, td
        border: none !important
</style>
