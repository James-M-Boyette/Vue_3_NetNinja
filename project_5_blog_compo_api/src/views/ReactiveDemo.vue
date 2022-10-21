<template>
  <div class="reactive-demo">
    <article class="demo-container">
      <!-- Intro -->
      <h1>Composition API & reactive() Demo</h1>
      <p class="explanation">
        In this example, we have <b>ref()</b> and <b>reactive()</b> examples put
        side-by-side. Clicking on the respective button will change the
        character's age.
      </p>

      <!-- Demo Objects -->
      <section id="reactive-demo-sideBySide">
        <!-- ref() -->
        <div id="reactive-demo-1">
          <h3>ref()</h3>
          <p>{{ ninjaOne.name }} - {{ ninjaOne.age }}</p>
          <button class="ref-demo-button" @click="updateNinjaOne">
            Change their age!
          </button>
        </div>

        <!-- reactive() -->
        <div id="reactive-demo-1">
          <h3>reactive()</h3>
          <p>{{ ninjaTwo.name }} - {{ ninjaTwo.age }}</p>
          <button class="ref-demo-button" @click="updateNinjaTwo">
            Change their age!
          </button>
        </div>
      </section>

      <br />

      <!-- Explanations -->
      <section id="reactive-demo-explanation">
        <h3>What are the pros and cons?</h3>
        <p class="explanation">
          Underneath the hood, the syntax required to do this is slightly
          different (`reactive()` declarations don't need the `.value` property
          in order to dig in to their contents).
        </p>
        <p class="explanation">
          This comes at a cost/trade-off: you cannot store primatives (numbers,
          strings, booleans, etc.) in reactive objects initially (during their
          declarations); you need to use objects, etc.
        </p>
        <p class="explanation">
          Additionally, reactive() objects lose their reactivity when expressed.
          I don't really understand what this means but, currently, reactive()
          objects don't seem to offer much over ref() ones ...
        </p>

        <!-- Supplemental Note -->
        <p class="explanation">
          Note:
          <em>
            This example is rather brief because I don't think I'll use the
            `reactive()` ref object much ...
          </em>
        </p>
      </section>
    </article>
  </div>
</template>

<script>
import { ref, reactive } from "vue";

export default {
  name: "ReactiveDemo",

  setup() {
    // ref()
    const ninjaOne = ref({
      name: "mario",
      age: 30,
    });
    // reactive()
    const ninjaTwo = reactive({
      name: "luigi",
      age: 35,
    });

    // ref()
    const updateNinjaOne = () => {
      ninjaOne.value.age = 40;
    };
    // reactive()
    const updateNinjaTwo = () => {
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
     * * Ultimately, I don't see a use for reactive over ref if it only saves one modifier but loses a bunch of functionality ...
     *
     * ... Maybe it's handy when you need to make the ref object more explicit to engineers ...?
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

<style></style>
