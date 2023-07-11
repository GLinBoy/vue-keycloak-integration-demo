<template>
  <form class="pa-5">
    <v-text-field
      v-show="userProfile.id !== undefined"
      v-model="userProfile.id"
      label="ID"
      variant="outlined"
      readonly
    ></v-text-field>

    <v-text-field
      v-show="userProfile.username !== undefined"
      v-model="userProfile.username"
      label="Username"
      variant="outlined"
      readonly
    ></v-text-field>

    <v-text-field
      v-show="userProfile.firstName !== undefined"
      v-model="userProfile.firstName"
      label="First Name"
      variant="outlined"
      readonly
    ></v-text-field>

    <v-text-field
      v-show="userProfile.lastName !== undefined"
      v-model="userProfile.lastName"
      label="Last Name"
      variant="outlined"
      readonly
    ></v-text-field>

    <v-text-field
      v-show="userProfile.email !== undefined"
      v-model="userProfile.email"
      label="E-mail"
      variant="outlined"
      readonly
    ></v-text-field>

    <v-checkbox
      v-show="userProfile.enabled !== undefined"
      v-model="userProfile.enabled"
      color="primary"
      label="Enabled"
      readonly
    ></v-checkbox>

    <v-checkbox
      v-show="userProfile.emailVerified !== undefined"
      v-model="userProfile.emailVerified"
      color="primary"
      label="EMail Verified"
      readonly
    ></v-checkbox>

    <v-checkbox
      v-show="userProfile.totp !== undefined"
      v-model="userProfile.totp"
      color="primary"
      label="TOTP"
      readonly
    ></v-checkbox>

    <v-text-field
      v-show="userProfile.createdTimestamp !== undefined"
      v-model="userProfile.createdTimestamp"
      label="Created"
      variant="outlined"
      readonly
    ></v-text-field>

    <v-chip
      v-for="role in userRoles"
      :key="role"
      class="ma-2"
      color="primary"
      text-color="white"
      prepend-icon="mdi-tag-text"
    >
      {{ role }}
    </v-chip>

    <v-btn
      variant="outlined"
      block
      color="primary"
      rounded="x-large"
      prepend-icon="mdi-shield-key-outline"
    >
      Keycloak Profile Page
    </v-btn>
  </form>
</template>

<script lang="ts" setup>
import { ref, reactive, Ref, onMounted } from "vue";
import authPromise from "@/plugins/keycloak";
import { KeycloakProfile } from "keycloak-js";

const userProfile: KeycloakProfile = reactive({});
const userRoles: Ref<string[]> = ref<string[]>([]);

onMounted(() => {
  console.info("Load user profile...");
  authPromise.then((auth) => {
    if (auth.isAuthenticated()) {
      auth.userInfo().then((usr) => {
        userProfile.id = usr?.id;
        userProfile.username = usr?.username;
        userProfile.email = usr?.email;
        userProfile.firstName = usr?.firstName;
        userProfile.lastName = usr?.lastName;
        userProfile.enabled = usr?.enabled;
        userProfile.emailVerified = usr?.emailVerified;
        userProfile.totp = usr?.totp;
        userProfile.createdTimestamp = usr?.createdTimestamp;
      });
      console.info(userProfile);
      userRoles.value = auth.userRoles();
      console.info(userRoles.value);
      console.info("User Profile Loaded.");
    }
  });
});
</script>
