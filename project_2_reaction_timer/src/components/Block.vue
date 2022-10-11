<template>
  <!-- Clickable object of the game -->
  <div class="block" v-if="showBlock" @click="stopTimer">😝 CLICK ME! 😝</div>
  <!-- This is our injectable `Block` template object. It has -->
  <!-- 1. a class (in order to style it),  -->
  <!-- 2. a second `v-if` tied to our data prop `showBlock`, and  -->
  <!-- 3. a 'click' listener, which will trigger our `stopTimer()` method when clicked.-->
</template>

<script>
export default {
  // Props & Data
  props: ["delay"],
  data() {
    return {
      showBlock: false,
      timer: null,
      reactionTime: 0,
    };
  },
  // Methods:
  methods: {
    // startTimer() is a bespoke method of ours, which uses the vanilla JS method `setInterval()` to do A) some work at B) set intervals:
    //    setInterval(() => {[call a function or do some logic]}, [at intervals of 'x'])

    // In this app, we're actually using it to do *two* pieces of work:
    // 1. update our data prop `reactionTime`, and
    // 2. our data prop `timer` - each by 10ms at a time ...

    // Why do this?
    // We want to be able to send back the total time taken to click the box, while simultaneously reseting the game's timer for future use/rounds of play ...
    startTimer() {
      this.timer = setInterval(() => {
        this.reactionTime += 10;
      }, 10);
    },
    stopTimer() {
      clearInterval(this.timer); // vanilla JS method that stops `setInterval()` method ?and clears/sets `timer` to `null`?

      // Custom event + data
      this.$emit("end", this.reactionTime);

      // Log messages to ignore ...
      console.log(`Your reaction time was ${this.reactionTime}`);
      console.log(`timer = ${this.timer}`);
    },
  },
  // Hooks:
  mounted() {
    setTimeout(() => {
      this.showBlock = true;
      this.startTimer();
    }, this.delay);
    // Using the passed-in data prop `delay` (a random number), we use the vanilla JS method `setTimeout()` to
    // 1. set the data prop `showBlock` to `true`, and
    // 2. run our bespoke `startTimer()` method
    // after `delay`'s time-amount has elapsed
    console.log("component mounted");
  },

  // Additional examples of Vue hooks (not actually used in this project, but useful for seeing the component lifecycle in-console ...)
  updated() {
    console.log("component updated");
  },
  unmounted() {
    console.log("component unmounted");
  },
};
</script>

<style>
.block {
  width: 400px;
  border-radius: 20px;
  background: #0faf87;
  color: white;
  text-align: center;
  padding: 100px 0;
  margin: 40px auto;
}
</style>
