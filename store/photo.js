import { createQuery } from '~/helpers/queryHelper'

export const state = () => ({
  albums: [],
  photos: [],
})
export const getters = {
  getAlbums: (state) => state.albums,
  getUnsorted: (state) => {
    return state.photos.filter((photo) => !photo.albumId)
  },
  getAlbumPhoto: (state) => (albumId) =>
    state.photos.filter((photo) => photo.albumId === albumId),
}
export const actions = {
  updateAlbum() {},
  async getPhotos({ commit }) {
    await this.$photos.get('/photos', createQuery(40)).then((result) => {
      console.log('result: ', result)
      commit('savePhotos', result.data)
      return result.data
    })
  },
  getAlbums({ commit }) {
    return this.$photos.get('/albums', createQuery(5)).then((result) => {
      commit('updateAlbums', result.data)
      return result.data
    })
  },
}
export const mutations = {
  addAlbum(state, payload) {
    state.albums.push(payload)
  },
  updateAlbums(state, albums) {
    state.albums = albums
  },
  savePhotos(state, data) {
    state.photos = data.map(({ id, title = '', url }) => {
      return {
        id,
        title,
        url,
      }
    })
  },
  removeAlbum(state, id) {
    state.albums = state.filter((item) => item.id !== id)
  },
}
