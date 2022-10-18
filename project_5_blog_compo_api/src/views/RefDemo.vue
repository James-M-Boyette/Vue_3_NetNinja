<template>
  <div class="ref-demo">
    <h2>Ref Demo</h2>
    <p ref="paragraph">
      My name is {{ name }}, and my age is {{ age }}. My current powerUp is
      {{ powerUp }}.
    </p>
    <label>Character Name: </label>
    <input type="text" v-model="name" />
    <br />
    <button @click="handleClick">Change his name!</button>
    <br />
    <button @click="age++">Increase their age!</button>
    <br />
    <button @click="handleClickPwrUp" ref="powerButton">Power him up!</button>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "RefDemo",
  // Though this is how we access the 'Composition API' it is technically a hook - and it runs before *all other* hooks!
  setup() {
    // These two variables, by default, are not reactive ...
    let charName = "Mario"; // Read-only / non-reactive, so far as our DOM is concerned ...
    let charAge = 30;

    // In order to make them reactive, we need to use *refs*
    // Note: I've changed them to constants to underline the fact that `charName` simply holds the *refrence* - and not the inner value. See the `handleClick` function below ...
    const charName2 = ref("Mario");
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
      charPowerUp.value = "Fireball";
      powerButton.value.innerHTML = "Fireball added!";
      console.log(powerButton, powerButton.value);
    };
    const charPowerUp = ref();
    const powerButton = ref(); // Here, I *think* Vue reconciles a match between our script's constant, and the DOM's refrence object

    return {
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
