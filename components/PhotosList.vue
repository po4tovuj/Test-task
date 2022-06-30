<template>
  <section>
    <draggable
      v-model="photos"
      v-bind="dragOptions"
      :pull="checkIn"
      :put="checkPut"
      @end="onEnd"
    >
      <!-- <ul class=""> -->
      <li v-for="photo in photos" :key="photo.id">
        <photo-card v-bind="photo"></photo-card>
      </li>
      <!-- </ul> -->
    </draggable>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PhotoCard from './PhotoCard.vue'

export default {
  name: 'PhotoList',
  components: { PhotoCard },
  data() {
    return {
      photos: [],
      dragOptions: {
        // return {
        animation: 200,
        group: 'photo',
        disabled: false,
        ghostClass: 'ghost',
        class: 'photo-list',

        tag: 'ul',

        // }
      },
    }
  },

  computed: {
    ...mapGetters({
      photoList: 'photo/getUnsorted',
    }),
  },
  watch: {
    photos(newVal, oldVal) {
      console.log('newVal: ', newVal)
    },
  },
  mounted() {
    this.photos = [...this.photoList]
  },
  methods: {
    ...mapActions({
      updatePhotos: 'photo/updatePhotos',
    }),
    checkIn(to, from, dragEl) {
      console.log('to in puull: ', to)
      console.log('from: ', from)
      console.log(dragEl)
    },
    checkPut(to, from, dragEl) {
      console.log('to in puull: ', to)
      console.log('from: ', from)
      console.log(dragEl)
    },
    checkMove(e) {
      // console.log('e: checkMove ', e)
    },

    onEnd(e) {
      console.log('e: onEnd ', e)
    },
  },
}
</script>

<style lang="scss" scoped>
.photo-list {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}
</style>
