<template>
  <section class="mb-12 text-center">
    <h1
      class="font-weight-light mb-2 headline"
      v-text="`Orderbook ${heading}`"
    />

    <span
      class="font-weight-light subtitle-1"
    >
      Please checkout the
      <a
        :href="`https://developers.komodoplatform.com/basic-docs/atomicdex/atomicdex-api.html`"
        rel="noopener"
        target="_blank"
        class="secondary--text"
        style="text-decoration:none;"
      >
        API documentation
      </a>
    </span>
  </section>
</template>

<script>
  export default {
    name: 'VComponent',

    props: {
      heading: {
        type: String,
        default: '',
      },
      link: {
        type: String,
        default: '',
      },
    },
  }
</script>
