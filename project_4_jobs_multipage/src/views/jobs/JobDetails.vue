<template>
  <!-- We use a `v-if` in order to inject the new page *only* once the fetch request has resolved (an async work-around) -->
  <div v-if="job">
    <h1>{{ job.title }}</h1>
    <!-- <p>The job id is {{ $route.params.id }}</p> -->
    <!-- Here, we're accessing the `route` object, and its params in order to access the id. If, however, we want to access it as a prop, we can do the following: -->
    <p>The job id is {{ id }}</p>
    <p>{{ job.details }}</p>
  </div>
  <!-- The below `v-else` will be displayed until the above `v-if` resolves ...-->
  <div v-else>
    <p>Loading job details ...</p>
  </div>
</template>

<script>
export default {
  /**
   ** Major Problem: how do we grab & display the params?
   **  > There are two solutions:
   */
  // 1. You can use `props` so long as you also set the given route object (in index.js) a property key of "props" and a value of "true" ...
  props: ["id"],

  // 2. ... or you can target the route object directly using `this.` ... I've chosen the former because it's shorter and simpler.

  // data() {
  //   return {
  //     id: this.$route.params.id,
  //   };
  // },
  data() {
    return {
      job: null,
    };
  },

  // We could get our data from JSON Server in multiple ways, but a popular one is to do a fetch when this component mounts.
  /**
   * TODO: this `fetch()` method has something to do with the "fetch API" ... WE SHOULD RESEARCH IT
   */
  mounted() {
    fetch(`http://localhost:3000/jobs/${this.id}`) // This is our (faux) API endpoint
      // What is returned from a 'fetch' request is an object *with a json property* attached to it
      .then((res) => res.json()) // In order to extract the data, we need to use the `json()` method on the response.
      .then((data) => (this.job = data)) // The json() method exposes this data, which we can then store directly in `this` component's 'jobs' prop
      .catch((err) => console.log("Data fetch error:", err.message));
  },
};
</script>

<style></style>
