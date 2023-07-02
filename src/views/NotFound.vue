<template>
  <v-app>
    <v-main class="d-flex align-center justify-center">
      <v-row class="d-flex align-center justify-center text-center">
        <v-col cols="12">
          <h1>404 - Page Not Found</h1>
        </v-col>
        <v-col cols="12">
          <router-link :to="{ name: 'home' }">
            <v-btn variant="outlined" prepend-icon="mdi-home"> Home </v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>
