<template>
  <div class="ref-demo">
    <h2>Ref Demo</h2>
    <p ref="paragraph">My name is {{ name }}, and my age is {{ age }}</p>
    <button @click="handleClick">Click me!</button>
    <input type="text" v-model="name" />
    <button @click="age++">Incr ase their age!</button>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "RefDemo",
  // Though this is how we access the 'Composition API' it is technically a hook - and it runs before *all other* hooks!
  setup() {
    // These two variables, on their own, are not reactive by default
    // let charName = "Mario";
    // let charAge = 30;

    // If, however, we use refs, we *can* make them reactive
    // Note: I've changed them to constants to underline the fact that `charName` simply holds the *refrence* - and not the inner value. See the `handleClick` function below ...
    const charName = ref("Mario");
    const charAge = ref(30);

    const handleClick = () => {
      console.log(paragraph, paragraph.value);
      // paragraph.value.classList.add("test-class");
      // paragraph.value.textContent = "I got a baaaad feeling about this ...";

      // Here, we're targeting the inner value of our ref(rence) and updating it above. That `charName` refrence is then read, and the associated template element is updated
      charName.value = "Luigi";
    };
    // Note: re: order of loading ... When we click the button that triggers the above `handleClick()` function, that button (along with all other DOM elements) have already been rendered - so our < p> element has been associated with our exported `paragraph` constant. As a result, this handler can now update the element's classes, change its text, etc. etc.

    // In order to do refrences (template and otherwise) in the *Composition* API, we can't use $refs. Instead, we need to 1. import `ref` method from our Vue package, and 2. declare the variable we'll want to connect to the DOM element later.
    // That is to say, currently, this constant 'paragraph' has a value of 'null' at build time ... (See the `return{...}` statement below for the next note)
    const paragraph = ref(null);

    return {
      name: charName, // As you'd expect, you could shorten this from `name: name` to just `name` so long as they're the same word. I've changed it to `charName` just to differentiate what's happening
      age: charAge,
      // NOTE: these variables *are not* reactive, as-is - we can't do two-way data-binding with them. We'd need either the `data()` function, or to use the `ref()` method (noted above) in order to make them reactive ...

      handleClick,

      // ... However HERE, we're exporting our ref() method with its container variable `paragraph`. After render time, it will be associated with any HTML element containing the `ref=` property.
      // (see our `handleClick()` method above for the final piece ...)
      paragraph,
    };
  },
};
</script>
