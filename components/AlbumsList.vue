<template>
  <div class="column">
    <!-- <draggable
      class="redBdr"
      tag="ul"
      :list="contents"
      :group="{ name: 'albums', pull: ['photo'] }"
    >
      <li
        v-for="album in contents"
        :key="`${album.id + '' + album.type}`"
        :data-id="album.id"
        :class="`blueBdr ${album.type}`"
      >
        <card
          v-if="album.type === 'is-album'"
          :title="album.title"
          :album-id="album.id"
        >
          <template #default>
            <draggable
              v-if="album.type === 'is-album'"
              :list="album.photos"
              :group="innerDragOptions"
              @change="handleChange"
            >
              <li v-for="photo in album.photos" :key="photo.id">
                {{ photo.title }}
              </li>
            </draggable>
          </template>
        </card>
      </li>
    </draggable> -->
    <!-- <draggable :list="contents" @change="handleChange">
      <li v-for="album in contents" :key="album.id"></li>
    </draggable> -->
    <draggable
      class="redBdr"
      @change="handleChange"
      v-model="contents"
      :group="outerDragOptions"
    >
      <div
        v-for="el in contents"
        :key="el.title"
        :class="`blueBdr ${el.type || ''}`"
        :album-id="el.id"
      >
        <p>{{ el.type }}</p>
        <p>{{ el.title }}</p>
        <draggable
          v-if="el.type === 'is-album'"
          class="orangeBdr minH"
          :photo-id="el.id"
          :list="el.photos"
          :group="groupDraggableOptions"
        >
          <div
            v-for="formObj in el.photos"
            :key="formObj.id + '' + formObj.url"
            class="greenBdr"
          >
            <p>{{ formObj.title }}</p>
          </div>
        </draggable>
      </div>
    </draggable>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import Card from './Card.vue'
// import PhotoCard from './PhotoCard.vue'
export default {
  name: 'AlbumsList',
  display: 'Nested',
  order: 15,
  components: {},
  data() {
    return {
      outerDragOptions: {
        name: 'g1',
        put: (to, from, dragEl) => {
          console.log('fromfffdsf: ', from)
          console.log('dsfsfsfsfdsfragEl: ', dragEl)
          console.log('tossfsfsdfsf: ', to)
        },
        pull: (to, from, dragEl) => {
          console.log('fsdfsfsfsfrom: ', from)

          console.log('tosfsfsfsf: ', to)
        },
        // clone: this.moveFromTheAlbum,
        class: 'albums-wrapper',
        // move: this.checkMove,
        tag: 'ul',
      },
      groupDraggableOptions: {
        name: 'g1',
        put: (to, from, dragEl, evt) => {
          console.log('evt: ', evt)
          const photoId = dragEl.getAttribute('album-id')
          const albumId = to.options.photoId
          console.log('photoId: ', photoId)
          console.log('albumId: ', albumId)
          this.movePhoto({
            albumId,
            photoId,
          })
          return false
          // return !dragEl.classList.contains('is-album')
        },
      },
      innerDragOptions: {
        name: 'photo',
        // put: (to, from, dragEl) => {
        //   console.log('from: ', from)
        //   console.log('to: ', to)
        //   console.log(dragEl)
        //   return !dragEl.classList.contains('albums-wrapper') // || !to.classList.contains("formgroup")
        // },

        // clone: this.moveFromTheAlbum,
        // tag: 'ul',
        // class: 'albums-list__photo-wrapper',
        // move: this.checkMove,
      },
    }
  },
  computed: {
    ...mapGetters({
      albumsList: 'photo/getAlbums',
      photoList: 'photo/getUnsorted',
    }),
    contents: {
      get() {
        return this.albumsList.concat(this.photoList)
      },
      set(val) {
        console.log('val: ', val)
      },
    },
    albums: {
      get() {
        return [...this.albumsList]
      },
      set(val) {
        debugger
        // this.updateAlbums(val)
      },
    },
  },
  methods: {
    ...mapActions({
      updateAlbums: 'photo/updateAlbums',
      movePhoto: 'photo/movePhoto',
    }),
    checkIn(to, from, dragEl) {
      // console.log('to in puull: ', to)
      // console.log('from: ', from)
      // console.log(dragEl)
    },
    checkPut(to, from, dragEl) {
      // console.log('to in puull: ', to)
      // console.log('from: ', from)
      // console.log(dragEl)
    },
    checkMove(evt) {
      // console.log('evt: ', evt)
    },
    moveFromTheAlbum(photo) {
      // console.log('photo: ', photo)
      // this.movePhoto(photo)
    },
    saveToAlbum(payload) {
      // console.log('payload: ', payload)
      return false
      // console.log('payload in save to: ', payload)
    },
    handleChange(payload) {
      // console.log('ON Change: ', payload)
    },
  },
}
</script>
<style lang="scss" scoped>
.minH {
  min-height: 25px;
}
.orangeBdr {
  border: 2px dashed orange;
  margin: 15px;
}
.redBdr {
  border: 2px solid red;
  margin: 15px;
}
.blueBdr {
  border: 2px solid blue;
  margin: 15px;
}
.greenBdr {
  border: 2px solid orchid;
  margin: 15px;
}
</style>
