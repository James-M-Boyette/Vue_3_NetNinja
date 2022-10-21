<template>
  <div class="ref-demo">
    <article class="demo-container">
      <h1>Composition API & ref() Demo</h1>

      <!-- Introduction -->
      <p class="explanation">
        Variables declared within the `setup()` hook (required in order to use
        the Composition API) are not, on their own, reactive. They can be read,
        but they cannot be updated via user inputs, etc.
      </p>
      <p class="explanation">
        In the following example, we have two sentances:
      </p>

      <!-- Simple, non-dynamic ref() usage -->
      <p class="explanation">
        The first one is accessing the read-only variable `charName` (which has
        a value of "baby Mario"). This variable cannot be dynamically updated.
      </p>
      <p id="non-reactive-ref">
        <i> My name used to be "{{ charName }}", but then I grew up. </i>
      </p>

      <!-- Dynamic ref()s and their uses -->
      <p class="explanation">
        The second one is accessing multiple <em>reactive</em> refs:
      </p>
      <ul>
        <li>`name` (via `charName2`),</li>
        <li>`age` (via charAge2), and</li>
        <li>`powerUp` (via charPowerUp).</li>
      </ul>
      <p id="reactive-ref" ref="paragraph">
        <i>
          Now my name is
          <span class="ref-dynamic-value"> {{ name }} </span>, my age is
          <span class="ref-dynamic-value"> {{ age }} </span>, and my current
          powerUp is
          <span class="ref-dynamic-value"> {{ powerUp }} </span>
        </i>
      </p>
      <p class="explanation">
        These variables are reactive (within the Composition API's scope) via
        the use of refs. At run-time, the ref name(s) in our script are matched
        with those in the virtual DOM, and their stored values become available
        for dynamic modification.
      </p>
      <p class="explanation">
        Try this first input - if you replace `charName2`'s current value with
        any new text, that inputted value will be transfered to the `charName2`
        ref object (via a `v-model` directive). Then, the above sentance will
        be-rerendered with that new data ...
      </p>

      <!-- User-inputs that update the values of ref() objects -->
      <label>Character Name: </label>
      <input type="text" v-model="name" />
      <p class="explanation">
        ref() values can be updated in a number of ways. The buttons below will
        allow you to
      </p>
      <ul>
        <li>
          <button class="ref-demo-button" @click="handleClick">
            Change their name!
          </button>
        </li>
        <li>
          <button class="ref-demo-button" @click="age++">
            Increase their age!
          </button>
          <span>(+1 each time ...)</span>
        </li>
        <li>
          <button
            class="ref-demo-button"
            @click="handleClickPwrUp"
            ref="powerButton"
          >
            Power them up!
          </button>
        </li>
      </ul>
    </article>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "RefDemo",
  // Though this is how we access the 'Composition API' it is technically a hook - and it runs before *all other* hooks!
  setup() {
    // These two variables, by default, are not reactive ...
    let charName = "baby Mario"; // Read-only / non-reactive, so far as our DOM is concerned ...
    let charAge = 20;

    // In order to make them reactive, we need to use *refs*
    // Note: I've changed them to constants to underline the fact that `charName` simply holds the *refrence* - and not the inner value. See the `handleClick` function below ...
    const charName2 = ref("Mario (replace me)");
    const charAge2 = ref(30);

    const handleClick = () => {
      console.log(paragraph, paragraph.value);
      // paragraph.value.classList.add("test-class");
      // paragraph.value.textContent = "I got a baaaad feeling about this ...";

      // Here, we're targeting the inner value of our ref(rence) and updating it above. That `charName` refrence is then read, and the associated template element is updated
      charName2.value = "Luigi";
    };
    // Note: re: order of loading ... When we click the button that triggers the above `handleClick()` function, that button (along with all other DOM elements) have already been rendered - so our < p> element has been associated with our exported `paragraph` constant. As a result, this handler can now update the element's classes, change its text, etc. etc.

    // In order to do refrences (template and otherwise) in the *Composition* API, we can't use $refs. Instead, we need to 1. import `ref` method from our Vue package, and 2. declare the variable we'll want to connect to the DOM element later.
    // That is to say, currently, this constant 'paragraph' has a value of 'null' at build time ... (See the `return{...}` statement below for the next note)
    const paragraph = ref(null);

    const handleClickPwrUp = () => {
      charPowerUp.value = "Fireball!";
      powerButton.value.innerHTML = "Fireball added!";
      console.log(powerButton, powerButton.value);
    };
    const charPowerUp = ref("nothing yet ...");
    const powerButton = ref(); // Here, I *think* Vue reconciles a match between our script's constant, and the DOM's refrence object

    return {
      charName,
      name: charName2, // As you'd expect, you could shorten this from `name: name` to just `name` so long as they're the same word. I've changed it to `charName` just to differentiate what's happening
      age: charAge2,
      // NOTE: these variables *are not* reactive, as-is - we can't do two-way data-binding with them. We'd need either the `data()` function, or to use the `ref()` method (noted above) in order to make them reactive ...

      handleClick,

      // ... However HERE, we're exporting our ref() method with its container variable `paragraph`. After render time, it will be associated with any HTML element containing the `ref=` property.
      // (see our `handleClick()` method above for the final piece ...)
      paragraph,

      handleClickPwrUp,
      powerButton, // I *think* this is matched with the virtual DOM's 'powerButton' refrence object at run-time, and then updated over the component's livecycle? .. our `paragraph` constant should have a 'null' value at build-time, but once a user can click the associated button, I think a link has been established by Vue.
      powerUp: charPowerUp,
    };
  },
};
</script>

<style></style>
