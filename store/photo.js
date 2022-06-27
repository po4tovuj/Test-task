export const state = () => ({
  albums: [],
  photos: [],
})
export const getters = {
  getAlbums: (state) => state.albums,
  getUnsorted: (state) => {
    return state.photos.filter((photo) => !photo.album.id)
  },
  getAlbumPhoto: (state) => (albumId) =>
    state.photos.filter((photo) => photo.albumId === albumId),
}
export const actions = {
  updateAlbum() {},
  getPhotosList() {},
  getAlbums({ commit }) {
    const options = {
      params: new URLSearchParams({
        _page: 1,
        _limit: 5,
      }),
    }

    return this.$photos('/albums', options).then((result) => {
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
  removeAlbum(state, id) {
    state.albums = state.filter((item) => item.id !== id)
  },
}
