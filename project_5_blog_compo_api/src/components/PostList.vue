<template>
  <div class="post-list">
    <div v-for="post in posts" :key="post.id">
      <!-- We could show each `post` here directly ... but it might be better to further-modularize our code. -->
      <!-- <h3>{{ post.title }}</h3> -->
      <!-- So, instead of the above example (where we're display the `title` property of every post in an h3),we'll instead show a 2nd-level-nested/child component here ... -->
      <SinglePost :post="post" />
      <!-- Note that we're also passing it each post as a prop(erty) -->
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, onUpdated } from "@vue/runtime-core";
import SinglePost from "./SinglePost.vue";

export default {
  props: ["posts"],
  components: { SinglePost },
  setup(props) {
    console.log("Props:", props);
    console.log("Posts:", props.posts);

    // Note that here, we're using lifecycle hooks *inside* of the `setup()` API; the syntax is more React-like:
    onMounted(() => console.log("component mounted"));
    onUnmounted(() => console.log("component unmounted"));
    onUpdated(() => console.log("component updated"));
  },
};
</script>

<style></style>
