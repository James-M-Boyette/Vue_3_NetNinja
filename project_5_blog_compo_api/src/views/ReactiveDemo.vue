<template>
  <div class="reactive-demo">
    <h2>Reactive Demo</h2>

    <h3>Refs</h3>
    <p>{{ ninjaOne.name }} - {{ ninjaOne.age }}</p>
    <button @click="updateNinjaOne">Change their age!</button>
    <br />
    <h3>Reactive</h3>
    <p>{{ ninjaTwo.name }} - {{ ninjaTwo.age }}</p>
    <button @click="updateNinjaTwo">Change their age!</button>
  </div>
</template>

<script>
import { ref, reactive } from "vue";

export default {
  name: "ReactiveDemo",

  setup() {
    const ninjaOne = ref({
      // ref()
      name: "mario",
      age: 30,
    });
    const ninjaTwo = reactive({
      // reactive()
      name: "luigi",
      age: 35,
    });

    const updateNinjaOne = () => {
      // ref()
      ninjaOne.value.age = 40;
    };
    const updateNinjaTwo = () => {
      // reactive()
      ninjaTwo.age = 45;
    };
    // ... So ... so far, the difference in using 'reactive' is that you can skip using `.value` to go through the nested properties?
    // Apparently reactive has drawbacks:
    /**
     * 1. You can't use `primatives` inside of "reactive" refrences:
     *     `const name = reactive('James')` wouldn't work bc 'James' is a primative (a "string")
     *     .. similarly, having your function set ninjaTwo.name = "Wario" also wouldn't work
     * 2. Something about how reactives lose their dynamic nature when exposed?
     *
     * * Ultimately, I don't see a use for reactive over ref if it only saves one modifier but loses a bunch of functionality <eye-roll>
     */
    return {
      ninjaOne,
      ninjaTwo,
      updateNinjaOne,
      updateNinjaTwo,
    };
  },
};
</script>
