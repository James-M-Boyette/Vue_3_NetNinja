<template>
  <div class="home">
    <h1 id="project-5-header">Project #5</h1>

    <article id="blog-posts-demo" class="demo-container">
      <!-- Website structure/explanation -->
      <section id="project-intro">
        <h2>Intro:</h2>
        <p class="explanation">
          In project #5 (videos #9 & 10), we focus on the 'Composition API' (+
          its `setup()` hook), and how to use the tools we've already learned
          (event hooks, props, refs, directives, etc.) within it. This page is
          portal to that exploration:
        </p>
        <p class="explanation"></p>
        <ul>
          <li>
            On <b>this</b> landing page, you can explore a fully-modularized
            app, which uses all of the above tools.
          </li>
          <li>
            The <b>"ref"</b> demo page explores how `ref()`s, specifically, can
            be used within the 'Composition' API to make script variables
            *reactive*/dynamic.
          </li>
          <li>
            The <b>"reactive"</b> demo does the same for `reactive()` refrence
            objects (but only briefly, since I didn't see much use for them
            other than as a refrence point, should I encounter them in some
            future code base).
          </li>
          <li>Finally, the <b>"computed"</b> demo covers two topics:</li>
          <br />
          <ol>
            <li>
              "computed()" refrence objects (which combine the logic of a
              function and the storage of a ref object to make a one-way
              data-bound object), and
            </li>
            <li>
              a couple of "Composition" API-specific hooks (`watch()` and
              `watchEffect()`) - which can come in handy, especially when you
              want to react to propogated changes throughout your code.
            </li>
          </ol>
        </ul>
      </section>

      <!-- Landing Page: a Blog app -->
      <section id="the-blog">
        <!-- General summary -->
        <h2>The Blog App:</h2>

        <p class="explanation">
          As previously indicated, this landing page presents a fully
          modularized app that utilizes all the tools we've learned in this
          tutorial series. It demonstrates ...
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

        <!--  -->
        <h3>How is this app laid-out?</h3>
        <p class="explanation">On the surface, you the user can</p>
        <ol>
          <li>
            see a summary/index page of the blog posts currently available, and
          </li>
          <li>see a given blog post's 'show' page ...</li>
        </ol>
        <p class="explanation">
          But underneath the hood, this app is using multiple components and
          sub-components to do the work.
        </p>

        <!-- 'Index page' -->
        <h3>'Index' page</h3>
        <p class="explanation">
          Firstly, this landing page has the parent 'HomeView.vue' component. It
          is importing two child components: a 'PostList.vue' component (from
          the 'components' folder), and a 'getPosts.js' "composable". The first
          is being inserted into this parent's template (&lt;PostList />), and
          contains the logic required to display <em>all</em> the blog posts
          (see below for how we're determining <em>what</em> to show for each
          individual post element), while the second contains the actual blog
          data.
        </p>
        <p class="explanation">
          <b>Note:</b> because Vue (unlike React) has bi-directional data-flow,
          this parent component is <b>importing</b> both the `posts` and `error`
          props of 'getPosts.js' - which we are then being used to
          conditionally-display either 1. those blog posts (if they have a
          .length greater than 'null'), or 2. an error message (if one is being
          thrown from `getPosts.js`) ... or 3. a 'loading' message (if there is
          no error, but also no blog posts data as-of-yet).
        </p>
        <p class="explanation">
          Secondly, the `PostList.vue` <em>also</em> has a sub-component (a
          twice-nested) component called `SinglePost.vue` (also in the
          components folder). This component is allowing us to control
          <em>what</em> is shown for each individual post element. Of course,
          this could have been kept in 'PostList.vue', but it's worth demo'ing
          whether and how to implement multi-nested componenets. In this demo,
          our 'SinglePost.vue' is providing
        </p>
        <ol>
          <li>
            the 'router-link' to each post (with the post's title as the
            explicit/~innerHTML text),
          </li>
          <li>
            the logic for displaying a short, snippet of the post's body, and
          </li>
          <li>all tags associated witht he post.</li>
        </ol>
        <p class="explanation">
          'SinglePost.vue' is largely proscribing one approach to/formatting of
          the summary blog post data - and we could have multiple itterations of
          this file, made available to the entire app, if we wanted (maybe this
          is renamed to `BlogSnipTag.vue`, and we make another named
          `BlogTitleTag.vue` that shows *no* body info - just a title and the
          tags). This allows us to switch in/out different formats as we like in
          the future.
        </p>
        <br />

        <!-- 'Show' page -->
        <h3>'Show' page</h3>

        <p class="explanation">This has a similarly modularized setup, where</p>
        <ul>
          <li>
            'SinglePost.vue' acts as another complete webpage, but performs the
            required logic + returns the data from
          </li>
          <li>
            'getSinglePost.js' - a second "composable." This is useful, should
            we want to display a specific post on some other webpage, because we
            can import this "composable" into that component, too.
          </li>
        </ul>

        <p class="explanation">
          <b>Note:</b> These next two buttons do more than just allow us to
          further-interact with our "blog" components (hiding/revealing them,
          and deleting them) ... they also allow us to see a few more
          Composition API-specific hooks in action (via the browser's console):
        </p>
        <ul>
          <li>
            Clicking these buttons will display `console.log` statements for
            `onMounted()`, `onUnmounted()`, and `onUpdated()` hooks (declared in
            our `PostList.vue` component). Notice that they're the same hooks we
            have available to us in the 'Options' API, but with slightly-more
            React-y syntax ("on_").
          </li>
        </ul>

        <div id="watch-demo">
          <div>
            <button @click="showPosts = !showPosts">
              Toggle posts "visible"
            </button>
            <!-- Simple, in-line JavaScript that deletes the last element of our `posts` array (the internal value of yet another ref() object) -->
            <button @click="posts.pop()">Delete last post</button>
          </div>
          <h4>
            Click on a blog posts's title/link (below) to be taken to a 'Show'
            page!
          </h4>
          <div>
            <div v-if="posts.length">
              <!-- Declare a 'posts' prop(erty) (and data-bind it to our `posts` ref() object) in order to pass data from `getSinglePost.js` to `PostList.vue`. Then, injected 'PostList.vue' back into this parent component  -->
              <!-- Additionally, give it a `v-if` conditional tied to variable *here* (in 'HomeView.vue'), so that we can use inputs like our first button to "turn off" their visibility -->
              <PostList :posts="posts" v-if="showPosts" />
            </div>

            <!-- Use `v-else` to show a 'loading' message when 1. the data hasn't come back yet, but 2. there is no error -->
            <div v-else>Loading ...</div>

            <!-- Read the `error` prop from `getPosts.js` and show an error here *if* `getPosts.js` throws one + populates the `error` ref() object ... -->
            <div v-if="error">{{ error }}</div>
          </div>
        </div>
      </section>
    </article>
    <footer>
      <div>Oct 2022</div>
    </footer>
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
     * * Un-Modularized Logic:
     *    - The following was our initial logic - written within this component in order to fetch blog post data, throw errors etc.
     *    - However, "composables" offer an opportunity to both modularize this logic out of this component *and* make that data more readily-available to *all* (the other) components! Therefore, it was moved to 'getPosts.js', and its outputs are now shared between both this component ('HomeView.vue'), and its child ('PostDetails.vue')
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
