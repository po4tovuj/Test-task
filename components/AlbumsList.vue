import Card from '~/components/Card';
<template>
  <div class="column">
    <Card
      v-for="album in albums"
      :key="album.id"
      :title="album.title"
      :albumId="album.id"
      :photo-list="photos"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from './Card.vue'
export default {
  name: 'AlbumsList',
  components: { Card },

  computed: {
    ...mapGetters({
      albums: 'photo/getAlbums',
    }),
  },
}
</script>
