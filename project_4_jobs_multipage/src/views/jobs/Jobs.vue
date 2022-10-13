<template>
  <h1>Jobs</h1>
  <!-- Again, we're using `v-if` & `v-else` in order to show awaited content (and place-holder content). However, unlike JobDetails.vue, where we'd get an error, this element technically doesn't need the wrapper `v-if` div to avoid an error -->
  <div v-if="jobs.length">
    <div v-for="job in jobs" :key="job.id" class="job">
      <router-link :to="{ name: 'JobDetails', params: { id: job.id } }">
        <h2>{{ job.title }}</h2>
      </router-link>
    </div>
  </div>
  <div v-else>Loading jobs ...</div>
</template>

<script>
export default {
  data() {
    return {
      // This is data stored directly in our app. In order to simulate fetching data from an external source, I've commented this out and done the second thing (per the video)
      // jobs: [
      //   { title: "Ninja UX Designer", id: 1, details: "lorem" },
      //   { title: "Ninja Web Developer", id: 2, details: "lorem" },
      //   { title: "Ninja Backend Developer", id: 3, details: "lorem" },
      // ],
      jobs: [],
    };
  },
  // We could get our data from JSON Server in multiple ways, but a popular one is to do a fetch when this component mounts.
  /**
   * TODO: this `fetch()` method has something to do with the "fetch API" ... WE SHOULD RESEARCH IT
   */
  mounted() {
    fetch("http://localhost:3000/jobs") // This is our (faux) API endpoint
      // What is returned from a 'fetch' request is an object *with a json property* attached to it
      .then((res) => res.json()) // In order to extract the data, we need to use the `json()` method on the response.
      .then((data) => (this.jobs = data)) // The json() method exposes this data, which we can then store directly in `this` component's 'jobs' prop
      .catch((err) => console.log("Data fetch error:", err.message));
  },
};
</script>

<style>
.job h2 {
  background: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  margin: 10px auto;
  max-width: 600px;
  cursor: pointer;
  color: #444;
}
.job h2:hover {
  background: #ddd;
}
.job a {
  text-decoration: none;
}
</style>
