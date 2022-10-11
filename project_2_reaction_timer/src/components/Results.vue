<template>
  <p>Reaction time: {{ this.playerScore }} ms</p>
  <p id="rank">... {{ playerEval }}</p>
</template>

<script>
export default {
  props: ["playerScore"], // Here's our prop, passed-in from App.vue
  data() {
    return {
      playerEval: null, // Here's our message to the player - which will be updated after this.playerScore is evaluated in our `beforeMount()` hook
    };
  },
  methods: {},
  beforeMount() {
    if (this.playerScore > 500) {
      this.playerEval = "WAKE UP!";
    } else if (this.playerScore > 400) {
      this.playerEval = "... Are you paying attention?";
    } else if (this.playerScore > 300) {
      this.playerEval = "Kinda good ...";
    } else {
      this.playerEval = "WIZARD, you're fast !!!";
    }
    console.log(`playerEval: ${this.playerEval}`);
  },
};
</script>

<style>
#rank {
  font-size: 1.4em;
  color: #0faf87;
  font-weight: bold;
}
</style>
