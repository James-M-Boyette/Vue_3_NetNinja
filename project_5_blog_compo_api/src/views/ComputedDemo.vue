<template>
  <div class="home">
    <article class="demo-container">
      <h1>computed(), watch() & watchEffect()</h1>

      <!-- Basic computed() usage -->
      <h4>Basic `computed()` ref</h4>
      <p class="explanation">
        In the example below, a 'computed()' ref is returning its value. It is
        <em>only</em> returning an explicit value, and not one based on other
        refs (and their values), nor any function logic).
      </p>
      <div id="basic-computed-demo">
        <p>[ {{ myName }} ]</p>
      </div>

      <!-- Advanced computed() usage -->
      <h4>Advanced `computed()` ref</h4>
      <p class="explanation">
        In this next example, our 'matchingNames()' computed ref is being used
        much more fully: as you, the user, input letters into the field ...
      </p>
      <div class="computed-form">
        <span class="computed-label">Character's new name:</span>
        <input type="text" v-model="search" class="computed-input-field" />
      </div>

      <ol>
        <li>Those inputs are being stored in a second ref() named `search`,</li>
        <p>User 'search'ed for ... {{ search }}</p>
        <li>
          A third ref named `characters` is being filtered by our matchingNames
          computed() ref, and the results stored in the `matchingNames` ref
          object, and finally
        </li>
        <li>
          we are using a `v-for` loop to display `matchingNames`' ref value(s)
        </li>
      </ol>
      <div
        v-for="name in matchingNames"
        :key="name"
        class="computed-characters-list"
      >
        <span>{{ name }}</span>
      </div>
      <p class="explanation">
        Note: you will see the entirety of `characters` listed at the outset
        (because you've entered nothing), which ~equals a match with everything.
        If you enter a matching name (including capitalized first name), you
        will then see only that match above. Also, you cannot have more than one
        match displayed, using the current logic in the code ...
      </p>

      <!-- watch() and watchEffect() hooks -->
      <h4>Composition API hooks: `watch()` and `watchEffect()`</h4>
      <p class="explanation">
        In this final, somewhat-off-topic example, we have a button that, when
        clicked, will call our watch() and watchEffect() hooks. This will stop
        their "watching" behavior.
      </p>
      <ul>
        <li>
          Try inputting more characters in the above-example's input field
          <em>with the dev console open</em>. Note the log messages.
        </li>
        <li>
          Next, click the button below and then enter more into the input field.
          Notice how no more log messages are triggered.
        </li>
      </ul>
      <p class="explanation"></p>
      <div class="" id="watchEffect-hook-demo">
        <button @click="handleClickStopWatch" id="stop-watch-button">
          Stop Watching
        </button>
      </div>
    </article>
  </div>
</template>

<script>
import { computed, ref, watch, watchEffect } from "vue";

export default {
  name: "ComputedDemo",
  // Though this is how we access the 'Composition API' it is technically a hook - and it runs before *all other* hooks!
  setup() {
    /**
     *   * Composition API `computed()` ref
     *
     */

    // Here, we have the simplest of `computed()` ref statements. It does not refer to any other ref objects or their internal values. Instead, it demonstrates the pure result: the read-only returning of data. If we access the `myName` ref object, we will get the value "James" ...
    const myName = computed(() => {
      return "James";
    });

    // What if we'd like to do some work, based on other ref objects and their values? Moreover, what if we'd like to have a more succinct way of doing that work and storing the result? This is where `computed()` really shines
    const characters = ref([
      "Mario",
      "Yoshi",
      "Luigi",
      "Toad",
      "Bowser",
      "Koopa",
      "Peach",
    ]);

    const search = ref(""); // User input is stored progressively (letter by letter)

    // the computed() ref stores both the results of function logic/work *and* that logic in a read-only object. This makes the `computed()` ref effectively a one-way databound object ... it has a dynamic, but uni-directional data value because of its reliance (potentially) on other refrence objects. If those other objects change, a computed() object's returned value can change (after its logic is executed).
    // In this file's example case, we'd like to 1. filter the `characters` ref object values against 2. whatever the user input is (which is being stored in a second, `search` ref object). As `search` updates (with new letters and words), it'd be nice to both re-run a .filter method *and* return the results - all in one refrence object. Moreover, it'd be even nicer to display any and all matches in a template element (using, a `v-for` loop on `matchingNames` outputted value(s))...

    /**
     * IOW ...
     *   1. the user types things into the template's "input" field,
     *   2. `v-model` is used to establish *two-way* databinding with the virtual DOM's 'search' refrence object,
     *   3. that refrence object is continually ("dynamically) read by `matchingNames`' `computed()` function and
     *   4. performs a .filter() on the `characters` refrence object (I think there's implicit 'get' and 'set'ing going on here ...), and
     *   5. returns/stores the (new) restul in the `matchingNames` refrence object
     */

    const matchingNames = computed(() => {
      return characters.value.filter((name) => name.includes(search.value));
    });

    /**
     * Ultimately, it seems that `computed()`'s purpose' is to combine the data storage of a refrence object and the logic of a seperate, inpinging function into one one statement (for brevity & clarity):
     *
     * const matchingNames = [] // piece #1
     * const matches = () => {matchingNames.value = the result of some 'filter' work} // piece #2
     *
     * ... become merged into ...
     * const matchingNames = computed()
     *   Note: as a ref object, matchingNames *is* storing a value *in addition to* (rather than *only*) a function (as in vanilla JS function declarations, such as `const myFunction = () => {}`, where you'd need to set `const myResult = myFunction(some input)`). This is shorter and cleaner.
     */

    /**
     *   * Composition API hooks: `watch()` and `watchEffect()`
     *
     */

    // `watch()` and `watchEffect()` are Composition API-specific. They can be used to watch for changes in data, elements etc.
    // watch(search, () => {
    //   console.log("watch function ran");
    // });

    // watchEffect(() => {
    //   console.log("watchEffect function ran", search.value);
    // });

    // Moreover, if you want to be able to stop them from watching, you can declare them as the value of a constant, and then invoke that constant (now, a function) to stop them
    const stopWatch = watch(search, () => {
      console.log("watch function ran");
    });

    const stopEffect = watchEffect(() => {
      console.log("watchEffect function ran", search.value);
    });

    // stopWatch();
    // stopEffect();
    // Put these in a button to give dynamic control over turning them off ...
    const handleClickStopWatch = () => {
      console.log("Stop watching ...");
      stopWatch();
      stopEffect();
    };

    return { myName, characters, search, matchingNames, handleClickStopWatch };
  },
};
</script>

<style></style>
