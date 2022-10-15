<template>
  <div class="home">
    <h1>Project #5</h1>
  </div>
</template>

<script>
import { computed, ref } from "vue";

export default {
  name: "HomeView",
  // Though this is how we access the 'Composition API' it is technically a hook - and it runs before *all other* hooks!
  setup() {
    const name = computed(() => {
      return 'shaun'
    })
    return {};
  },
};
</script>
