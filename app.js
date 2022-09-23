const app = Vue.createApp({
  // data, functions etc
  // template: "<h2>I am the tempalte</h2>",
  data() {
    return {
      favSciFiFranchise: "Star Wars",
      favStarWarsEpisode: "Empire Strikes Back",
      exampleNumber: 1,
      isloggedIn: false,
    };
  },
  methods: {
    changeExampleNumber() {
      this.exampleNumber = 4321;
    },
    // Notice, here, that in order to get access to the 'exampleNumber" property of our app (in data()), we need to use `this.`
    passInNewNumber(newNumber) {
      console.log(newNumber);
      this.changeExampleNumber = newNumber;
    },
    toggleLoggedIn() {
      // console.log(this.isloggedIn);
      this.isloggedIn = !this.isloggedIn;
    },
  },
}); // using the Vue library, we create a Vue app - and within this app, we can declare and manipulate data, functions etc

app.mount("#app"); // take our 'app' instance (instantiated on line #1, above), and mount it to the DOM element that has an ID of 'app'

// ** Note that now, anything inside our HTML <div> (in index.html) will be controlled by Vue ... while anything *outside* of it wont be
