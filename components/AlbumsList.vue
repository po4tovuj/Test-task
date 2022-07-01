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
    <draggable :list="albums" :group="outerDragOptions" class="redBdr">
      <li
        v-for="el in albums"
        :key="el.id"
        :class="`blueBdr ${el.type || ''}`"
        :data-album-id="el.id"
      >
        <p>{{ el.type }}</p>
        <p>{{ el.title }}</p>
        <draggable
          v-if="el.type === 'is-album'"
          class="orangeBdr minH"
          :data-album-id="el.id"
          :v-model="el.photos"
          :group="innerDragOptions"
          @end="onEnd"
          @change="(e) => handleChange({ e, albumId: el.id })"
        >
          <li
            v-for="photo in el.photos"
            :key="photo.id + '' + photo.url"
            :data-photo-id="photo.id"
            class="greenBdr"
          >
            <p>{{ photo }}</p>
          </li>
        </draggable>
      </li>
    </draggable>
    <PhotosList></PhotosList>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AlbumsList',
  display: 'Nested',
  order: 15,

  data() {
    return {
      albums: [],
      outerDragOptions: {
        name: 'g1',
        put: 'g1',
        clone: false,
        class: 'albums-wrapper',
        tag: 'ul',
      },
      innerDragOptions: {
        name: 'photo',
      },
    }
  },

  computed: {
    ...mapGetters({
      albumsList: 'photo/getAlbums',
      photoList: 'photo/getPhotos',
    }),
    contents: {
      get() {
        return this.albumsList
      },
      set(val) {
        this.$store.commit('photo/sortAlbums', val)
      },
    },
  },

  mounted() {
    this.albums = [...this.albumsList]
  },
  methods: {
    ...mapActions({
      updateAlbums: 'photo/updateAlbums',
      movePhoto: 'photo/movePhoto',
      sortPhotoInAlbum: 'photo/sortPhotoInAlbum',
    }),

    handleChange({ e: { moved, removed }, albumId }) {
      if (removed) return false
      if (moved && albumId) {
        this.sortPhotoInAlbum({
          albumId,
          newIndex: moved.newIndex,
          oldIndex: moved.oldIndex,
        })
      }
    },
    onEnd({ from, to, item }) {
      const prevAlbumId = from.getAttribute('data-album-id')

      const newAlbumId = to.getAttribute('data-album-id')

      const photoId = item.getAttribute('data-photo-id')

      if (newAlbumId === prevAlbumId) {
        return false
      }
      this.movePhoto({ newAlbumId, photoId, prevAlbumId })
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
