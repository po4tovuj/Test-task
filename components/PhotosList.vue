<template>
  <section>
    <ul class="photo-list">
      <li v-for="photo in photos" :key="photo.id" class="photo">
        <photo-card v-bind="photo"></photo-card>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import PhotoCard from './PhotoCard.vue'

export default {
  name: 'PhotoList',

  components: { PhotoCard },
  computed: {
    ...mapGetters({
      photos: 'photo/getUnsorted',
    }),
  },
}
</script>

<style lang="scss" scoped>
.photo-list {
  list-style-type: none;
  padding: 0;
}
</style>
