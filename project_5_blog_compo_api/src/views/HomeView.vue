<template>
  <div class="home">
    <h1>Project #5</h1>
    <p>{{ myName }}</p>
    <input type="text" v-model="search" />
    <p>search term - {{ search }}</p>
    <div v-for="name in matchingNames" :key="name">
      {{ name }}
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";

export default {
  name: "HomeView",
  // Though this is how we access the 'Composition API' it is technically a hook - and it runs before *all other* hooks!
  setup() {
    const myName = computed(() => {
      return "James";
    });

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

    // computed() appears to store the results of a function in a read-only / one-way databound object ... so we can run a `v-for` loop on the resulting array and display (read) the results of `matchingNames`' computed() logic ... and computed(), here, will return the `.filter()` results dynamically as the `search` ref object is updated by the user
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

    // I think the purpose of `computed()` is to combine the data storage of a refrence object and the logic of a seperate, inpinging function into one one statement:
    // const matchingNames = []
    // const matches = () => {matchingNames.value = the result of some 'filter' work}
    return { myName, characters, search, matchingNames };
  },
};
</script>
