<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link :to="{ name: 'refDemo' }">Ref Demo</router-link> |
    <router-link :to="{ name: 'reactiveDemo' }">Reactive Demo</router-link> |
    <router-link :to="{ name: 'computedDemo' }">Computed Demo</router-link>
  </nav>
  <router-view />
</template>

<style></style>
