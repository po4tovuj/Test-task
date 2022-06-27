<template>
  <section class="section">
    <div class="columns is-flex-wrap-wrap is-mobile">
      <card
        v-for="album in albums"
        :key="album.id"
        :title="album.title"
        icon="github"
      >
        Open source on <a href="https://github.com/buefy/buefy"> GitHub </a>
      </card>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

import Card from '~/components/Card'

export default {
  name: 'IndexPage',
  async asyncData({ store }) {
    await store.dispatch('photo/getAlbums').then((result) => {})
    return {}
  },

  components: {
    Card,
  },
  computed: {
    ...mapGetters({
      albums: 'photo/getAlbums',
    }),
  },
}
</script>
