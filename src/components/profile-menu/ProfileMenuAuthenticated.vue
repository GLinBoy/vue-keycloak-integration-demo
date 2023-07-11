<template>
  <div>
    <v-menu min-width="200px" rounded>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-avatar :image="gravatarImage" size="32"> </v-avatar>
        </v-btn>
      </template>
      <v-card class="px-5">
        <v-card-text>
          <div class="mx-auto text-center">
            <v-avatar class="my-2" :image="gravatarImage" size="48"> </v-avatar>
            <h3>{{ fullname }}</h3>
            <p class="text-caption mt-1">{{ userEmail }}</p>
            <v-divider class="my-3"></v-divider>
            <v-btn
              color="primary"
              variant="text"
              :to="{ name: 'profile' }"
              prepend-icon="mdi-card-account-details-outline"
            >
              Profile
            </v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn
              color="primary"
              variant="text"
              @click="logoutAccount()"
              prepend-icon="mdi-logout-variant"
            >
              Logout
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Md5 } from "ts-md5";
import authPromise from "@/plugins/keycloak";

const userEmail = ref("");
const gravatarImage = ref("");
const fullname = ref("");

authPromise.then((auth) => {
  auth.userInfo().then((usr) => {
    userEmail.value = usr?.email || "";
    fullname.value = `${usr?.firstName || ""} ${usr?.lastName || ""}`.trim();
    gravatarImage.value =
      "https://www.gravatar.com/avatar/" +
      Md5.hashStr(userEmail.value) +
      "?s=32&d=retro";
  });
});

const logoutAccount = () =>
  authPromise.then(async (auth) => {
    auth.logout(`${location.origin}`);
  });
</script>
