<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <!-- These `router-link` tags are special replacements for vanilla < a> tags - they let Vue intercept the client request (before it goes out to the server) and serve/inject the new local page ...  -->
    <!-- ... you *could* use generic anchor tags, but the application would become much slower (and avoid using most of the beneifts of Vue) as a regular request would be made and resolved to/from the server (rather than rendered dynamically, locally) -->
    <router-link :to="{ name: 'about' }">About</router-link>
    <!-- This router-link's `to` attribute (equivilent to an anchor's 'href=""') is data-bound to index.js's keys. This allows us to only change the path in index.js and have those changes propegated everywhere -->
    <!-- Note: I'm not clear on why/how this works ... -->
  </nav>
  <router-view />
  <!-- This 'router-view' is where any page a user visits will be injected (About, Home etc)-->
</template>

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
</style>
