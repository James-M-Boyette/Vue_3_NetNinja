<template>
  <div class="home">
    <h1>Project #5</h1>

    <article id="blog-posts-demo" class="demo-container">
      <section id="project-intro">
        <h2>Intro:</h2>
        <p class="explanation">
          In this last section of the intro course, we cover several things:
        </p>
        <ul>
          <li>
            How to implement the various Vue directives, refs, props, and hooks
            within the Composition API's `setup()` hook,
          </li>
          <li>How to use twice-nested components,</li>
          <li>
            How to use 'composables' to further-modularize the code's logic,
          </li>
        </ul>
        <h3>How is this app laid-out?</h3>
        <p class="explanation">This landing page has two sections:</p>
        <ul>
          <li>
            a demo of using Options API's hooks in the Composition API (using
            `on` suffix), and
          </li>
          <li>~the blog itself~</li>
        </ul>
      </section>
      <section id="the-blog">
        <h2>The Blog Project:</h2>

        <p class="explanation"></p>
        <p class="explanation">
          In our `PostList.vue` component, we have some Composition API-specific
          hooks declared within its setup() hook. These buttons allow us to
          visualize their firings (if you have dev console open)
        </p>
        <!-- In our `PostList.vue` component, we have some Composition API-specific hooks declared within its setup() hook. These buttons allow us to visualize their firings (if you have dev console open) -->
        <button @click="showPosts = !showPosts">Toggle posts "visible"</button>
        <button @click="posts.pop()">Delete last post</button>

        <!-- Update the above element so that we can also use `v-else` to show a 'loading' message when 1. the data hasn't come back yet, but 2. there is no error -->
        <div v-if="posts.length">
          <!-- Declare a 'posts' property for our `PostList` injected element, and data-bind it to our `posts` ref() object -->
          <PostList :posts="posts" v-if="showPosts" />
        </div>
        <div v-else>Loading ...</div>

        <!-- Show an error if one is triggered ... -->
        <div v-if="error">{{ error }}</div>
      </section>
    </article>
  </div>
</template>

<script>
import { ref } from "vue";
import PostList from "@/components/PostList.vue";
import getPosts from "@/composables/getPosts";

export default {
  name: "HomeView",
  components: { PostList },
  setup() {
    /**
     *   * Composition API and props
     *      Here, we have some blog posts. We'd like to display summary info about them while
     *      1. keeping our code modular and
     *      2. passing data via props
     *      However, we haven't learned yet how to do this using the Composition API ...
     *      First,
     *
     */
    const showPosts = ref(true);

    /**
     * * The following was the original logic written to fetch blog post data. However, "composables" offer an opportunity to both modularize that logic out of this component *and* make its data more readily-available to every component
     */
    // const posts = ref([]);
    // const error = ref(null);

    // const load = async () => {
    //   try {
    //     let data = await fetch("http://localhost:3000/posts");
    //     if (!data.ok) {
    //       throw Error("No data available 😬");
    //     }
    //     posts.value = await data.json();
    //   } catch (err) {
    //     error.value = err.message;
    //     console.log(err.value);
    //   }
    // };

    const { posts, error, load } = getPosts();

    load();

    return { posts, error, showPosts };
  },
};
</script>

<style></style>
