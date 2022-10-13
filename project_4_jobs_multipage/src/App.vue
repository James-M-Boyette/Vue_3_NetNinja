<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <!-- These `router-link` tags are special replacements for vanilla < a> tags - they let Vue intercept the client request (before it goes out to the server) and serve/inject the new local page ...  -->
    <!-- ... you *could* use generic anchor tags, but the application would become much slower (and avoid using most of the beneifts of Vue) as a regular request would be made and resolved to/from the server (rather than rendered dynamically, locally) -->
    <router-link :to="{ name: 'about' }">About</router-link> |
    <!-- This router-link's `to` attribute (equivilent to an anchor's 'href=""') is data-bound to index.js's keys. This allows us to only change the path in index.js and have those changes propegated everywhere -->
    <!-- Note: I'm not clear on why/how this works ... my current best-guess is that router-link includes logic that, when the `to` property points to a k:v, it searches the objects of index.js's 'routes' array for one with a matching 'name' key, and then injects the associate component upon a user's click ... -->
    <router-link :to="{ name: 'Jobs' }">Jobs</router-link>
  </nav>

  <!-- These buttons (and their associated methods) demonstrate "Programmatic Navigation" - where we create elements that use bespoke methods in order to navigate around the website -->
  <button @click="redirect">Redirect</button>
  <button @click="back">Go back</button>
  <button @click="forward">Go forward</button>

  <router-view />
  <!-- This 'router-view' is where any page a user visits will be injected (About, Home etc)-->
</template>

<script>
export default {
  methods: {
    redirect() {
      this.$router.push({ name: "home" });
    },
    back() {
      this.$router.go(-1);
      // Note that here, we're not using $route - which would give us access to the `route` object in index.js. Instead, this gives us access to the literal router, allowing us to control the client
    },
    forward() {
      this.$router.go(+1);
      // Note: we can set this number to anything we want, and the router will go forwards or backwards that many pages. Example: if we went from 1. Home to 2. About to 3. Jobs *and* set our `back()` method to -2 ... hitting `back would return us to the Home page!
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
}

nav a.router-link-exact-active {
  color: white;
  background: crimson;
}

button {
  margin: 0 10px;
  padding: 10px;
  border: none;
  border-radius: 4px;
}
</style>
