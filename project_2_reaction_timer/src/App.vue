<template>
  <h1>Ninja Reaction Timer</h1>

  <!-- Button to begin the game: -->
  <button @click="start" :disabled="isPlaying">Play</button>
  <!-- When clicked, our bespoke `start()` method is run, which ... -->
  <!-- 1. sets a random amount for our `timerDelay` data prop between 2 & 7ms, and -->
  <!-- 2. sets our `isPlaying` data prop to `true` -->
  <!-- Q: is `isPlaying` redundant (since `showBlock` exists in the `Block` component)? -->

  <!-- Clickable object of the game -->
  <Block v-if="isPlaying" v-bind:delay="timerDelay" @end="endGame"></Block>
  <!-- Only displays if ... -->
  <!-- 1. data prop `isPlaying` = `true`, and -->
  <!-- 2. our `Block` component's `mounted()` hook resolves its `setTimeout()` actions. -->

  <!-- Note: we pass our `timerDelay` number to `Block`'s `mounted()` hook so that it can know how long to wait (using `setTimeout`) before ... -->
  <!-- 1. revealing the clickable-block, and -->
  <!-- 2. starting `startTimer()`'s incrementation of the `timer` and `reactionTimer` data props -->

  <!-- Challenge: convert this <p> tag into a seperte "Results" component ... -->
  <!-- <p v-if="showResults">Reaction time: {{ score }}ms</p> -->
  <Results v-if="showResults" :playerScore="score" />
  <!-- Now, we're passing our data prop 'score' to the 'Results' component as the prop "playerScore" -->
</template>

<script>
import Block from "./components/Block.vue";
import Results from "./components/Results.vue";

export default {
  name: "App",
  components: { Block, Results },
  data() {
    return {
      isPlaying: false,
      timerDelay: null,
      score: null,
      showResults: false,
    };
  },
  methods: {
    start() {
      this.timerDelay = 2000 + Math.random() * 5000; // Delay between 2 & 7ms
      this.isPlaying = true;
      this.showResults = false;

      console.log(`This game's delay is ${this.timerDelay} ms!`);
    },
    //
    endGame(playerTimeTaken) {
      this.score = playerTimeTaken;
      this.isPlaying = false;
      this.showResults = true;

      console.log(`Time taken by player to click: ${this.score}`);
    },
  },
};
</script>

<style></style>
