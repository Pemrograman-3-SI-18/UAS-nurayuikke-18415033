<template>
  <q-layout view="lHh lpR fFf">
      <q-toolbar unelevated style="height: 70px" class="bg-white text-blue-grey-14">
        <div class="text-h5 q-ml-lg">Sekolah App</div>

        <q-space/>
        <div v-if="$q.screen.xs || $q.screen.md || $q.screen.lg || $q.screen.xl ">
            <q-btn size="medium" :to="{ name: 'homeUser' }" flat>Home</q-btn>
            <q-btn size="medium" :to="{ name: 'myWork' }" flat>Tugas Saya</q-btn>
            <q-btn size="medium" flat>Tentang</q-btn>
            <q-btn size="medium" @click="logout" flat>Logout</q-btn>
        </div>
        <q-btn flat @click="drawer = !drawer" round v-if="$q.screen.xs || $q.screen.sm" icon="menu"/>
    </q-toolbar>
    <q-drawer
        v-model="drawer"
        :width="200"
        :breakpoint="500"
        side="left"
      >
        <q-scroll-area class="fit">
          <q-list padding="menu-list">

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="home"/>
              </q-item-section>
              <q-item-section>
                Home
              </q-item-section>
            </q-item>

          </q-list>
        </q-scroll-area>
      </q-drawer>
    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  data () {
    return {
      drawer: null
    }
  },
  methods: {
    logout () {
      this.$q.localStorage.remove()
      this.$router.push({ name: 'loginPage' })
    }
  }
}
</script>
