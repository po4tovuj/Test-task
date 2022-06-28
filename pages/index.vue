<template>
  <section class="section">
    <div class="columns is-flex-wrap-wrap is-mobile">
      <card v-for="album in albums" :key="album.id" :title="album.title" />
      <!-- Open source on <a href="https://github.com/buefy/buefy"> GitHub </a> -->
    </div>
    <photos-list> </photos-list>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import Card from '~/components/Card'
import PhotosList from '~/components/PhotosList.vue'

export default {
  name: 'IndexPage',
  components: {
    Card,
    PhotosList,
  },

  async fetch({ store }) {
    console.log('this: ', this)

    // await store.dispatch('photo/getAlbums')
    await store.dispatch('photo/getPhotos')
  },
  // activated() {
  //   // Call fetch again if last fetch more than 30 sec ago
  //   // if (this.$fetchState.timestamp <= Date.now() - 10000) {
  //   this.$fetch()
  //   // }
  // },

  computed: {
    ...mapGetters({
      albums: 'photo/getAlbums',
    }),
  },
  methods: {
    ...mapActions({
      fetchAlbums: 'photo/getAlbums',
      fetchPhotos: 'photo/getPhotos',
    }),
    async fetchData() {
      await this.$store.dispatch('photo/getAlbums')
      // await this.fetchPhotos()
    },
  },
}
</script>
