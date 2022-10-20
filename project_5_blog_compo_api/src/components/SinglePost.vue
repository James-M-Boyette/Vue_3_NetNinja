<template>
  <div class="post">
    <router-link :to="{ name: 'details', params: { id: post.id } }">
      <!-- This nested component can display different sub-properties of our `post` objects - such as the 'title' or the 'body' -->
      <h3>{{ post.title }}</h3>
    </router-link>

    <!-- <p>{{ post.body }}</p> -->
    <!-- ... but what if we want to display just a snippet - a small part of each post's 'body'? They are pretty large, after all, and we might just want to give users a small reminder of each blog post's contents ... see the `script` section for an explanation -->
    <p>{{ snippet }}</p>

    <span v-for="tag in post.tags" :key="tag"> #{{ tag }} </span>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";

export default {
  props: ["post"],
  setup(props) {
    // In the Composition API, we need to
    const snippet = computed(() => {
      return props.post.body.substring(0, 40) + "..."; // substring() takes two args: where do you want to start, and where do you want to end (int he string)
    });

    return { snippet };
  },
};
</script>

<style></style>
