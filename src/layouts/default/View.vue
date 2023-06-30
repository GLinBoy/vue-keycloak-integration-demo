<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer">
      </v-app-bar-nav-icon>
      <v-toolbar-title>Application bar</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item title="Navigation drawer"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main
      class="d-flex align-center justify-center"
      style="min-height: 300px"
    >
      <router-view />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const drawer = ref(true);
</script>
