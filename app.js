const introApp = Vue.createApp({
  // using the Vue library, we create a Vue app
  // And within our Vue app, we can do several things ...

  // We can pass page elements to the root of our HTML:
  // template: "<h2>I am the template</h2>",

  // We can declare data:
  data() {
    // Note: it appears that this must be called 'data'
    return {
      rawHtml: "<p>I am HTML from app.js's introApp() instance ...</p>",
      favSciFiFranchise: "Star Wars",
      favStarWarsEpisode: "Empire Strikes Back",
      exampleNumber: 1,
      isLoggedIn: false,
      x: 0,
      y: 0,
      starWarsEpisodes: [
        { title: "The Phantom Menace", episode: 1 },
        { title: "The Clone Wars", episode: 2 },
        { title: "Revenge of the Sith", episode: 3 },
        { title: "A New Hope", episode: 4 },
        { title: "Empire Strike Back", episode: 5 },
        { title: "Return of the Jedi", episode: 6 },
      ],
    };
  },
  // We can declare functions:
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
      this.isLoggedIn = !this.isLoggedIn;
    },
    // handleEvent() { console.log(event)};
    // If the event object is the only argument being passed, no params need be specified.
    handleEvent(e, data) {
      console.log("event occured ...", e, e.type);
      if (data) {
        console.log("number:", data);
      }
    },
    handleMouseMove(e) {
      this.x = e.offsetX;
      this.y = e.offsetY;
    },
  },
});

introApp.mount("#introApp"); // take our 'app' instance (instantiated on line #1, above), and mount it to the DOM element that has an ID of 'app' ... effectively exporting it to our root HTML

// Note: now, anything inside our HTML <div> (in index.html) will be controlled by Vue ... BUT anything *outside* of it wont be.
// I assume this means that we could name this first vue app one thing (like, say, "introToVueDemo") and export it to an HTML element with ID of #introToVueDemo ... and then make a second one called something else ... My question, then, would be if and how data could be exchanged between these two vue apps ...
