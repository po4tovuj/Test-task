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
          <!-- <NuxtLink
            class="nav-bar-link"
            :to="item.to"
            exact-active-class="is-active"
          > -->
          {{ item.title }}
          <!-- </NuxtLink> -->
        </b-navbar-item>
      </template>
    </b-navbar>
    <!-- <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src=" />
        </a>
       <v-slot> -->
    <!-- <template slot="start"> -->
    <!-- <b-navbar-item v-for="(item, key) of items" :key="key">
            <NuxtLink :to="item.to" exact-active-class="is-active">
              <b-icon :icon="item.icon" /> {{ item.title }}
            </NuxtLink>
            > Home
          </b-navbar-item> -->
    <!-- <b-navbar-item href="#"> Documentation </b-navbar-item>
          <b-navbar-dropdown label="Info">
            <b-navbar-item href="#"> About </b-navbar-item>
            <b-navbar-item href="#"> Contact </b-navbar-item>
          </b-navbar-dropdown> -->
    <!-- </template> -->
    <!-- </v-slot> -->

    <!-- <span />
          <span /> -->
    <!--  </div>
    </nav> -->

    <section class="main-content columns">
      <!-- <aside class="column is-2 section">
        <p class="menu-label is-hidden-touch">General</p>
        <ul class="menu-list">
          <li v-for="(item, key) of items" :key="key">
            <NuxtLink :to="item.to" exact-active-class="is-active">
              <b-icon :icon="item.icon" /> {{ item.title }}
            </NuxtLink>
          </li>
        </ul>
      </aside> -->

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
          to: { name: 'index' },
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: { name: 'inspire' },
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
