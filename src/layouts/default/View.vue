<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar class="px-3">
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer">
      </v-app-bar-nav-icon>
      <v-toolbar-title>Application bar</v-toolbar-title>
      <v-spacer></v-spacer>
      <ProfileMenu></ProfileMenu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list nav>
        <v-list-item
          prepend-icon="mdi-home-outline"
          title="Home"
          value="home"
          to="/"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-lock-off-outline"
          title="Un-Secure"
          value="unsecure"
          to="/unsecure"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-lock-outline"
          title="User Secure"
          value="user-secure"
          to="/user_secure"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-shield-account-outline"
          title="Admin Secure"
          value="admin-secure"
          to="/admin_secure"
        ></v-list-item>
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
import ProfileMenu from "@/components/profile-menu/ProfileMenu.vue";

const drawer = ref(true);
</script>
