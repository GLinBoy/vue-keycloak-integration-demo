<template>
  <v-btn icon @click="loginUser()">
    <v-avatar
      image="https://www.gravatar.com/avatar/00000000000000000000000000000000?s=32&d=mp&f=y"
      size="32"
    >
    </v-avatar>
    <v-tooltip activator="parent" location="bottom">Login</v-tooltip>
  </v-btn>
</template>

<script lang="ts" setup>
import authPromise from "@/plugins/keycloak";

const loginUser = () =>
  authPromise.then(async (auth) => {
    auth.login(`${location.origin}`);
  });
</script>
