<template>
  <h1>Details</h1>

  <div v-if="error">{{ error }}</div>

  <div v-if="singlePost" class="post">
    <h3>"{{ singlePost.title }}"</h3>
    <p class="pre">{{ singlePost.body }}</p>
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

<style>
.post {
  max-width: 1200px;
  margin: 0 auto;
}

.post p {
  color: #444;
  line-height: 1.5em;
  margin-top: 40px;
}

.pre {
  white-space: pre-wrap;
}
</style>
