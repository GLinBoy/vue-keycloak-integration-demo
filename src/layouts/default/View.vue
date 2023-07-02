<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar class="px-3">
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer">
      </v-app-bar-nav-icon>
      <v-toolbar-title>Application bar</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu min-width="200px" rounded>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar
              image="https://www.gravatar.com/avatar/c1fb5a7f85902e8a394b1e338823e6d5?s=32&d=retro"
              size="32"
            >
            </v-avatar>
          </v-btn>
        </template>
        <v-card class="px-5">
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar
                class="my-2"
                image="https://www.gravatar.com/avatar/c1fb5a7f85902e8a394b1e338823e6d5?s=32&d=retro"
                size="48"
              >
              </v-avatar>
              <h3>John Doe</h3>
              <p class="text-caption mt-1">user@users.com</p>
              <v-divider class="my-3"></v-divider>
              <v-btn rounded variant="text"> Profile </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn rounded variant="text" @click="logoutAccount">
                Logout
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
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
import authPromise from "@/plugins/keycloak";
const drawer = ref(true);
const logoutAccount = () =>
  authPromise.then(async (auth) => {
    auth.logout(`${location.origin}`);
  });
</script>
