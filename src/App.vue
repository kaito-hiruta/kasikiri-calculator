<template>
  <v-app id="inspire">
    <create-kasikiri-dialog ref="childDialog"></create-kasikiri-dialog>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile @click="onClickHome()">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>トップページ</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :href="'https://twitter.com/miketako3'">
          <v-list-tile-action>
            <v-icon>mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title slot="activator">contact (twitter)</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{ appTitle }}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2018 @miketako3</span>
    </v-footer>
  </v-app>
</template>

<script>
import WebFontLoader from 'webfontloader'
import CreateKasikiriDialog from '@/components/CreateKasikiriDialog.vue'

export default {
  name: 'App',
  components: {
    CreateKasikiriDialog
  },
  data () {
    return {
      drawer: false,
      appTitle: '貸切ワリカン計算機'
    }
  },
  mounted () {
    WebFontLoader.load({
      google: {
        families: ['Roboto:100,300,400,500,700,900']
      },
      active: this.setFontLoaded
    })
  },
  methods: {
    setFontLoaded () {
      this.$emit('font-loaded')
    },
    onClickHome () {
      this.drawer = false
      this.$router.push({ name: 'index' })
    },
    onClickNewEvent () {
      this.drawer = false
      this.$router.push({ name: 'index' })
    },
    onClickContact () {

    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
