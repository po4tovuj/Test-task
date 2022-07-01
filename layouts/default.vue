<template>
  <div>
    <b-navbar class="header has-shadow is-primary">
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img src="~assets/buefy.png" alt="Buefy" height="28" />
        </b-navbar-item>
      </template>
      <template #start>
        <b-navbar-item v-for="(item, key) of items" :key="key" :href="item.to">
          {{ item.title }}
        </b-navbar-item>
      </template>
    </b-navbar>

    <section class="main-content columns">
      <div class="container column is-10">
        <Nuxt />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',

  data() {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: '/',
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: 'inspire',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.nav-bar-link {
  color: currentColor;
}
</style>
