<template>
  <div>
    <b-image
      :src="url"
      custom-class="img"
      :alt="title || `Image doesn't have name`"
    ></b-image>
    <p>{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: 'PhotoCard',
  props: {
    title: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
    albumId: {
      type: Number,
      default: 0,
    },
    id: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style lang="scss" scoped>
.image {
  max-width: 200px;
}
</style>
