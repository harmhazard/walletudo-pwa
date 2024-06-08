

<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu"
               @click="leftDrawerOpen = !leftDrawerOpen" />
        <q-toolbar-title>
          {{appTitle}}
        </q-toolbar-title>
        <div>Release {{ appVersion }}</div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen" show-if-above bordered
      content-class="bg-grey-1">
      <q-list>
        <q-item-label
          header
          class="text-grey-8">
          Essential Links
        </q-item-label>
        <RecursiveLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link">
        </RecursiveLink>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import EssentialLink from 'components/EssentialLink.vue'
import {ref} from "vue";



      const appTitle = ref('Project Name')
    const appVersion=ref('v0.1')
    const tleftDrawerOpen = ref( false)
      const essentialLinks = ref([
        {
          title: 'Search', caption: 'quasar.dev', icon: 'school',
          link: 'https://quasar.dev',
          level: 0,
          children: [{
            title: 'Documents', caption: 'quasar.dev',icon: 'school',
            link: 'https://quasar.dev',
            level: 1,
            children: [{
              title: 'Search (level 3)',
              caption: 'quasar.dev',
              icon: 'school',
              link: 'https://quasar.dev',
              level: 2,
              children: []
            }]
          }]
        },
        {
          title: 'Github',caption: 'github.com/quasarframework',
          icon: 'code',link: 'https://github.com/quasarframework',
          level: 0,
          children: [{
            title: 'Github Level 2',caption: 'quasar.dev',icon: 'school',
            link: 'https://quasar.dev',level: 1,
            children: []
          }]
        },
        {
          title: 'Forum',caption: 'forum.quasar.dev',
          icon: 'record_voice_over',link: 'https://forum.quasar.dev',
          level: 0,
          children: [{
            title: 'Forum Level 2',caption: 'quasar.dev',icon: 'school',
            link: 'https://quasar.dev',
            level: 1,
            children: []
          }]
        }
      ])


</script>

<style scoped>

</style>
