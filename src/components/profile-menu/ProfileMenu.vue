<template>
  <div v-if="isAuth">
    <ProfileMenuAuthenticated />
  </div>
  <div v-else>
    <ProfileMenuUnauthenticated />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ProfileMenuAuthenticated from "@/components/profile-menu/ProfileMenuAuthenticated.vue";
import ProfileMenuUnauthenticated from "@/components/profile-menu/ProfileMenuUnauthenticated.vue";
import authPromise from "@/plugins/keycloak";

const isAuth = ref(false);
authPromise.then((auth) => {
  isAuth.value = auth.isAuthenticated();
});
</script>
