<template>
  <div class="demo-container">
    <h1>Details</h1>

    <div v-if="error">{{ error }}</div>

    <div v-if="singlePost" class="post">
      <h3>"{{ singlePost.title }}"</h3>
      <p class="pre">{{ singlePost.body }}</p>
    </div>
  </div>
</template>

<script>
import getSinglePost from "@/composables/getSinglePost";

export default {
  props: ["id"],
  setup(props) {
    const { singlePost, error, load } = getSinglePost(props.id);

    load();

    return { singlePost, error };
  },
};
</script>

<style></style>
