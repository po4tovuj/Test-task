import { createQuery } from '~/helpers/queryHelper'
const keyBy = (obj, key) => {
  const parsedObject = obj.reduce((acc, item) => {
    acc[item[key]] = { ...item }
    return acc
  }, {})
  return new Map(Object.entries(parsedObject))
}
export const state = () => ({
  albums: {},
  photos: {},
})
export const getters = {
  getAlbums: (state) => {
    // console.log()
    return Array.from(state.albums.values())
  },
  getUnsorted: (state) => {
    return Array.from(state.photos.values())
    // return .filter((photo) => !photo.albumId)
  },
  getAlbumPhoto: (state) => (albumId) =>
    state.photos.filter((photo) => photo.albumId === albumId),
}
export const actions = {
  saveAlbums({ commit }, payload) {
    commit('saveAlbums', payload)
  },
  async getPhotos({ commit }) {
    await this.$photos.get('/photos', createQuery(40)).then((result) => {
      commit('savePhotos', result.data)
      return result.data
    })
  },
  updatePhotos({ commit }, payload) {
    commit('savePhotos', payload)
  },
  movePhoto({ commit }, photo) {
    commit('movePhoto', photo)
  },
  async getAlbums({ commit }) {
    return await this.$photos.get('/albums', createQuery(5)).then((result) => {
      commit('saveAlbums', result.data)
      return result.data
    })
  },
}
export const mutations = {
  addAlbum({ albums }, payload) {
    albums = keyBy(payload, 'id')
    // payload = payload.map((element) => {
    //   return { ...element, photos: [] }
    // })
    // state.albums.push(payload)
  },
  saveAlbums(state, payload) {
    // albums.reduce((acc, item) => {
    //   acc:
    // })
    const parsedAlbums = keyBy(
      payload.map((item) => ({
        ...item,
        isAlbum: true,
        type: 'is-album',
        photos: [],
      })),
      'id'
    )

    state.albums = parsedAlbums
  },
  savePhotos(state, data) {
    data = data.map((item) => ({ ...item, albumId: null }))
    state.photos = keyBy(data, 'id')
    // state.albums[2].photos.push(state.photos[1])
  },
  movePhoto(state, { albumId = null, photoId }) {
    const idToString = photoId.toString()
    console.log('photos.get(idToString): ', state.photos.get(idToString))
    state.photos.set(idToString, {
      ...state.photos.get(idToString),
      albumId,
    })
    // const clone = new Map(state.photos)
    // console.log('clone: ', clone)
    // console.log('photos.get(idToString): ', state.photos.get(idToString))

    // console.log('photos: ', state.photos)
  },
  removeAlbum(state, id) {
    state.albums = state.filter((item) => item.id !== id)
  },
}
