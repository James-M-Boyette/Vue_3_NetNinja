# NetNinja's "Vue3 Tutorial" Notes

## Getting Started: installing Vue 3

- If you want to install vue,

1. Run `npm init vue@latest` (and visit https://vuejs.org/guide/quick-start.html#creating-a-vue-application if you'd like to read the documentation)

- If you want to use a CDN directly in your code (and not do additional setup),

1. Insert `<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>` into your code

## Getting Started: Using the Vue CLI (Command Line Interface) to create a new project

- To create a new Vue project

  1. enter `vue create [your-project-name]`

- To insert the standard Vue component elements (`template`, `script` and `style` tags), write `vue` on the first line of the given component and select `<vue> with default.vue`

## Initial File/Folder Layout

- `public`: contains any public assets made available to the client - such as the singular `index.html` file your Vue app will use to inject various components etc during the course of its single-page rendering
- `src`: contains any source files that will be compressed, converted etc (say, if you were developing your app in Typescript and needed vanilla JS for production)
- `src` > `assets`: contains any images, .css files etc (note: you don't _have_ to store these things here, but it makes for a nice, tidy project)
- `src` > `components`: contains any 'child' components your app may use
  > Note: It's a good practice to name your components with an innitial Capital letter (Footer.vue vs footer.vue) so that you avoid conflicts in your template with vanilla HTML elements (if you had a footer.vue, then you'd get a conflict error when using it in a given component's template, bc it wouldn't know whether to use _your_ 'footer' component or the _vanilla_ HTML 'footer' element)
- `src` > `App.vue`: This is the **root** Vue component - while it _can_ hold all of the methods, data etc our original, single-component `... createApp({...})` contained, a robust Vue app is much more modularized through the use of "child componenets"
  > Given that Vue uses a 'nested component' approach to single-page generation, it is important to know that the entire map of all components (parent & child) is known as the _Component Tree_
- `src` > `main.js`: The JS file that kickstarts the app, using the `createApp(App).mount('#app')` method (imported from our Vue Node library) instead of `const introApp = Vue.createApp({})` ...

### For Vue-Router/Multi-page applications

- `src` > `router`: this folder contains `index.js` - the router logic file. Each object in `routes` constitutes an individual endpoint
  > Note: you can bind your router-view links to them, so that changes in this file are reflected in all bound components
- `src` > `views`: this folder normally contains the individual pages you'd like to intercept & inject with Vue (About, Home etc). It can also contain page-specific components (components only used by that page).
- `src` > `components`: since the `views` folder tends to hold page-specific components, this folder is often used for components that _aren't_ page-specific, and used on multiple pages (re-usable components like modals, navbars, headers, footers, etc.).

## Error Fixes:

- After the initial setup, running `npm run serve` threw an error `Multiple assets emit different content to the same filename index.html`. To solve this, one StackOverflow soln. was to rename `index.html` to `index.ejs` ... which seems to have solved the issue for now.

## Vue Syntax (General):

- Every Vue module/component has the `.vue` suffix
- Every module also has three sections:

  1. a `template` (html to be injected into the DOM),
  2. a `script` (where components, functions, data etc are imported and exported),
     > Note: this can often rely on the "Options API" - where you declare the `data(){}` function, the `props:` / `methods:` / `computed:` objects, or hook methods (`mounted(){}`, etc.). In Vue 3, the "Composition API" allows you to more-clearly group logic & data together, using hte simple `setup() {}` function (and declare all data, methods, lifecycle hooks etc within it in 'composition functions'/'composables')
  3. and a `style` section (where specific styling can be injected either for a specific component, or globally)
     > Note: as opposed to Vue2, Vue 3 allows you to have _multiple_ root elements in the root component's template (There's both an `<img>` and a `<HelloWorld>` (root) element (a component) in App.vue in the vanilla starting app, for instance ...)

- Vue "expressions" allow you to insert prop data into an HTML element's _inner text_, by using double curly-braces "{{ }}"

Example:

    <p> I have a {{ product }}</p>

## Styling

How to do it?

- If you'd like to style _all_ components, you can either

  1. Add additional stylings to the `<style>` section of a given component (it's not clear to me whether child components can impose their styling on parent ones, nor is it clear whether styling decalred in different components has a 'universal' scope, or is only "one-way" ... 🤔)
  2. Create a univeral style sheet (usually in your `assets` folder), and then importing that `.css` file in your `main.js` (`import "./assets/styles.css";`)
     > Thus far, I've opted for the second option, and then created seperate, component-specific files with equally-specific IDs and classes (similar to React/Next's `about.module.css` approach; see option #3 below ...).

- In order to style _only_ the elements in a given component's `<template>`, you can do one of three things: you can either

  1. add the Vue `scoped` property to the component's styling:

  <style scoped> </style>

  2. or you can make the styling more specific (by giving additional classes, IDs etc)

  <style> .modal h1 {...} </style>

  3. or you can just create .css style sheets (with specific IDs & classes) and import them into your main.js:
     `import "./assets/about.css";`

> You might want to consider doing either the second or third options because there's a slight performance hit when injected styling has to be rendered ...

## Directives:

Vue Directives encompass a number of tools that allow you to manipulate and pass data between components, as well as interact-with and update the DOM. _Note_ that these are not 'hooks' (hooks are covered later-on in this document).

### `v-if`

What is it?

- `v-if` is Vue's in-line _conditional_ directive. If the given variable, function, etc. resutls in 'true', the element containing this `v-if` property will be displayed (and conversley, if it evaluates to `false`, the element will be hidden in the render)

How do you use it?

- Syntax: `v-if='[variable to be evaluated]'`

Example:

    <SignIn v-if='!loggedIn' />

Here, we have a `<SignIn />` component - which will only be displayed if the user is not logged in (if the variable _not_ `loggedIn` resolves to `true`)

### `v-show`

What is it?

- `v-show` is Vue's CSS `display: none` override directive.
- ... I don't know when or why you'd use this, currently

How do you use it?

- Syntax: `v-show='[variable to be evaluated]'`

Example:

    <p v-show="showProductDetails">...</p>

Need an explanation here, later ...

### `v-bind` / "One-Way" Data Binding

What is it?

- `v-bind` is Vue's _one-way_ data-binding directive. It is most-often used to insert data into a `template` from somewhere else in the app (usually prop data). In this way, you can further-migrate your app towards a "single source of truth" (where data needs to be updated _directly_ in only one place ...)

  > Note: in general, it seems to me that v-bind is used on various CSS & HTML properties, while Vue _expressions_ are used to insert things into inner text, etc.

- Syntax: `v-bind:[template/html element]="[data/prop]"`
- Shorthand: `:[template/html element]="[data/prop]"`
  > For the 'short-hand' version, you simply drop the 'v-bind' and _keep_ the `:`

Example:

    <a v-bind:href="portfolioURL"> ... </a>

Here, our anchor tag no-longer has its `href` property set to something explicit (and in-line, like `<a href="www.my-website.com">`). Instead, we are using `v-bind` to insert the value of our `url` prop/key into the element:

    <script>
      export default {
        data() {
          return {
            🚀portfolioURL: "http://www.james-boyette.com",
          };
        },
      }
    </script>

#### Other One-Way Data Bindings:

`:disabled=`

What is it?

- `:disabled=` provides another way to evaluate the truthiness of a prop. In the following example, the button will be added or removed based on the truthiness of 'isButtonDisabled'
- Syntax: `<button :disabled="[prop to be evaluated]">`

Example:

      <button :disabled="isButtonDisabled">

> Note: It is not clear to me what the difference is between this and v-if ... I think they both get evaluated every time the page is re-rendered?

`:class=`

What is it?

- `:class=` allows you to conditionally-apply a class to an element. In the following example, the `div` will 1. have the class of `.active` applied to it if 2. the prop `isActive` is truthy
- Syntax: `<div :class="{ [class to be applied]: [prop to be evaluated]}">`

Example:

      <div :class="{ active: isActive}">

`:style=`

What is it?

- `:style=` allows you to apply a styling indirectly (much like our vanilla v-bind:href example). In the following example, the color of this `div` will be updated to whatever the prop 'activeColor' is currently set to
- Syntax: `<div :style="{ [CSS prop]: [styling to be applied]}">`

Example:

      <div :style="{ color: activeColor}">

### `v-model` / "Two-Way" Data Binding

What is it?

- `v-model` is Vue's _two-way_ data-binding directive. Two-way data-binding allows us to not only set a given template element to something in our data props, _but also_ to update that data prop as changes are made to the template element. This is especially useful for template elements that allow users to give an input (input fields, check boxes, drop-down menus, list generators, and even buttons, sometimes ...).
- In the following example, we have an input field that may be initially set to something like "your first name here" ... but can be altered by the user when they delete that string and enter "James" instead. As they enter a new string into the field, the prop `firstName will be updated to (temporarily) store the data. Later, if the user submits the form's data (without refreshing the page) the props _dynamically-updated_ data can be read, evaluated, and sent to a server, etc.

- Syntax: `v-model='[interactively-bound variable]'`

Example:

    <input v-model='firstName'>

#### Other Two-Way Data Bindings:

- `v-model.lazy=` ... Syncs input after change event
- `v-model.number=` ... Always returns a number
- `v-model.trim=` ... Strips whitespace

### `v-for` / "List" rendering

What is it?

- `v-for` is Vue's in-line _for loop_, which allows you to display multiple elements, pieces of data, etc. with much-more abbreviated code. At minimum, you need to set the `v-for` equal to 1. a variable name of your choice, 2. "in", 3. whatever prop-with-an-array or list element you'd like to itterate-through (see below). However, it is advised that you also 1. include the `key` property and 2. make it bound to a unique identifier in the list.

- Syntax: `v-for='[elment name of your choice] in [prop with an array]'` + `:key='[elment name of your choice].[unique identifier]'`

Example:

    <li v-for="item in items" :key="item.id"> {{ item }} </li>

Here, we have a prop list named "items" - we will itterate through it (using `v-for`) and assign the name `item` to each element in that list + display it using a Vue expression (`{{ item }}`). In order to have greater control (and, say, allow users to perform CRUD actions on these elements, etc.), the `key` property is being declared for each "item", and being given the given item's `id` value (we assume that the "items" array is an array of objects - each of which contains an `id` key with a unique value ...)

Example:

    return {
      items [
        { name: "sneakers", manufacturer: "Nike", price: 124.99, 🚀id: "Nike349"}
        { name: "sneakers", manufacturer: "Nike", price: 110.99, 🚀id: "Nike350"}
        { name: "sneakers", manufacturer: "Nike", price: 69.99, 🚀id: "Nike351"}
      ]
    }

#### Other Two-Way Data Bindings:

- `v-for=(item, index) in items` ... Provides access to the _position_ of the element in the array
- `v-for=(value, key) in object` ... Always you to itterate through an object's K:Vs

## Vue "Refs"

What are Vue "Refs"?

- At an abstract level, Vue "refs" _allow the developer to specifically-target things_ in their component. Using objects created in the virtual DOM, template elements can become tied to script variables.
- The most obvious and simple example of a Vue "ref" would be the "template" ref, which allows the developer to target and _directly_ modify an HTML DOM element using a "ref" _property_. Any element with such a property can then be targeted with the component's scripts in order to update classes, apply styling, provide new innerHTML etc. You can use template refs and directives via the 'Options' API in order to perform data binding and manipulation.

But what if you want to use the 'Composition API'?

- The slightly-less intuitive "ref() object" exists as a part of Vue's 'Reactivity API' (a subset of the 'Composition API'). When using the "Composition API" (instead of the "Options API"), you will still need a way to perform databinding - something the 'Composition API' _doesn't_ allow for in its script variables out-of-the-box. In order to get databinding functionality, you will need to import the 'Reactivity API', which gives access to things like the 'ref' and 'reactive' objects, and the 'computed()' function.
  > For examples and further explanation of 'reactive' and 'computed()', see the `ReactiveDemo.vue` and `RefDemo.vue` files. For now, we'll continue to focus on the 'ref' object.

_Going deeper ..._

## "Template" Refs (Vid #4, 25:25)

What are "Template Refs"?

- As previously-stated, `Template Refs` allow us to target DOM elements using a 'ref' property. A DOM element with a 'ref' property can then be stored inside a component-script's variable, making it accessible to and manipulateable by the component's script(s). This should feel very-much like the DOM targeting (`const targetElement = 'getElementbyID()'`) we'd normally do in a vanilla, companion JavaScript file.

How to use "Template Refs"?

- As previously indicated, in order to make a given `< template>` element within a component targetable, give that element a `ref` property, such as `ref="whatever name you want"`, and then refrence/target it in your component's script methods using `this.$refs` syntax:

  > In your component's `default methods: {...}`, use `this.$refs.[whatever name you want]` ...

Example:

    <template>
      ...
      <input type="text" 🚀ref="templateRefExample" />
    </template>

    <script>
      export default {
        ...
        methods: {
          handleClick() {
            🚀this.$refs.templateRefExample.classList.toggle("active");
            🚀this.$refs.templateRefExample.focus();
          },
        },
      };
    </script>

In this way, our `<input>` element now effectively has a 'templateRefExample' ref tag/handle, which we can grabbed/targeted by your scripts.

## Refrence & Reactive Objects (3 chapters in Vid #10, starting at 11:56)

### ref()

What are "Ref"s?

- "Ref" objects (within the 'Composition' API) provide a way to bind data between your component's template and its script(s).

How do you use them?

- "Ref" objects should be decalred as the value of a given variable in your script. Optionally, they can be given a starting value as an argument - which can then be updated via user inputs, other script functions etc.
  > - Check project_5's `RefDemo.vue` and `ReactiveDemo.vue`

Example:

    <template>
      <p ref="paragraph">
        My name is {{ charName }}, and my  current powerUp is
        {{ powerUp }}.
      </p>
      <button @click="handleClick" ref="powerButton">Power him up!</button>
    </template>

    <script>
      export default {
        setup() {
          🚀const charName = ref("Mario");
          🚀const charPowerUp = ref();

          🚀const handleClick = () => {
            charPowerUp.value = "Fireball";


            powerButton.value.innerHTML = "Fireball added!"
          };

          🚀const powerButton = ref()
        }
      }
      return {
        powerButton,
        // if the K & V are the same, you only need the one
        charName,
        // If different ...
        powerUp: charPowerUp,
        //
        powerButton
        handleClick,
      }
    </script>

Here, we've stored an instance of Vue's refrence object (?class?) in our `charName` variable. That instance has had "Mario" passed-in as its starting value. We've also declared a second Ref instance in `charPowerUp` but given it no starting value. Both can be bound to template elements in order to receive updates from user inputs (or be changed via other functions in this component's script).

Speaking-of, we also have an event listener that, when a button is clicked, will update our `charPowerUp` _refrence_ value - which is to say, we're not updating `charPowerUp`'s value (also indicated via `charPowerUp`'s declaration as an umodifiable _constant_). We are updating the linked Refrence object's value; essentially, we are telling Vue "Get me the ref object instance associated with `charPowerUp` and update its value to 'Fireball'."

Finally, we have an example of a _"template"_ refrence with our tempalte `<button ref="targetButton"` element. This HTML element is stored in the virtual DOM, inside of yet another refrence object. That refrence object is accessible to our component's scripts - but instead of using the `$ref` syntax, we need to declare a constant ?of the same name? (I'm not 100% sure about this - see `RefDemo.vue` for more ...)

### reactive()

What are "Reactive" objects?

- (from documentation)

  > "Returns a reactive proxy of the object"

- They function largely like "ref"rence objects, but can't accept primatives (strings, booleans, numbers, etc.) as arguments (like refs can)
- ... Probably worth researching more in the future in order to understand the benefits
  > - See project_5's `ReactiveDemo.vue` for examples & notes

### computed()

- (From documentation)

  > Takes a getter function and returns a read-only reactive ref object for the returned value from the getter
  > ... can also take an object with get and set functions to create a writable ref object.

- Frankly, it's a little unclear to me what it _actually_ does ...
- I _think_ its a refrence object that stores the result(s) of a function. The refrence object itself is read-only, but an be updated _indirectly_ via its associated function/logic: the `computed()` function logic can dynamically update and return/store new values as changes occur elsewhere in the DOM. This effectively makes the 'computed' refrence object "one-way" data-bound, since changes to other elements can/will be registered by the `computed()` logic, and a subsequent change made to this refrence object.
- Put another way, this is a more concise way to update data in a refrence object by combining 1. the data storage of a refrence object and 2. the seperate function logic that would modify it into one, singular thing.
  > - See project_5's `HomeView.vue` for an example & further notes ...

## Props & Data (Vid #5, 6:15)

Why use them?

- Props make components even more re-usable
- Props modularize said data, allowing it to only be declared in _one_ place (while being used in multiple other places) - a "single source of truth"
- Props allow for dynamic, customizeable content rendering

Declaring & Using them _within_ a component:

- So long as data is declared within the `<script>` portion of a component, it can (unsurprisingly) be used elsewhere in the component - if data() is `returning` a given key, that key (and its value) could, say be displayed in the component's template (in some HTML element) using double-curly braces (`{{ key name }}`).
  > - Check App.vue's `< h1> {{ title }} </ h1>` element to see how data is being declared locally in the 'Modal' component

Passing/Using _external_ data to/within a component:

- You need to do three things:
  1. declare both the given prop, and its value in the parent/exporting component,
     > - Check App.vue's '< Modal />' element (in its < template> section) to see several examples of declared props & their values. Note that `theme` has a hard-coded value, while `modalHeader` and `modalText` are being dynamically-bound to data in the < script> section
  2. declare `props:` as an array within the target component's < script> section, and
  3. declare the given prop key within that array, so that the data being exported from other components becomes available to that specific component.
     > - Check Modal.vue's `export default { props: [...]}` to see props being imported from App.vue and being made-available to the rest of the component

### Props in the Composition API

## Hooks

In general, Vue's hooks encompass the Creation, Mounting, Updating, and Destruction/un-Mounting of a component.

Create:

> At this point, the Composition API is set up

- beforeCreate()
  > At this point, the Options API is initialized
- created()

Mount:
When a component is rendered (created and inserted into the virtual DOM) ...

- beforeMount()
  > At this point, app.$el is created, and el is replaced with \_
- mounted()

Update:
When the virtual DOM is re-rendered and patched ...

> At this point, buttons have been clicked, data has changed, etc.

- beforeUpdate()
- updated()

Unmount:
When the component is removed from the DOM ...

- beforeDestroy / beforeUnmount()
- destroyed / unmounted()

## Composition API-specific Hooks

- The previous hooks can be used inside of the Composition API's `setup(){}` hook - you just need to add an `on` prefix to them (`onMound`, `onUpdate` )

When a specific value changes ...

- watch()
- watchEffect()
  > - This runs once when the setup function runs, and again for a given ref or that ref's children if/when a change occurs (you have to list the given ref in its logic, I think ...)
  > - Has the benefit, supposedly, of not requiring an explicit watch list?
  > - Also useful if you need to get data for components initially
  > - Check HomeView.vue for examples ...

## Emitting Custom Events (Vid #5, 17:29)

What are they?

- Custom events are useful for a variety of reasons. One obvious use-case is the ability to have other components listen for them and trigger a given method/function upon hearing them.

How do we make them?

- In order to create a custom event,
  1. Add an event property to a given `< template>` element (using the `@[event type]` syntax),
  2. bind it to a function (using the `="[given method name]"` syntax),
  3. have the bound method (in your component's `< script` section) issue a custom message (using the `this.$emit("[custom event message]")` syntax)

Example:

    <template>
      <div 🚀@click="closeModal">
    </template>

    <script>
      export default {
        methods: {
          closeModal() {
            🚀this.$emit("closeTheModal");
          },
      };
    </script>

> - Check Modal.vue's `closeModal()` method, which emmits a "closeTheModal" event.
> - Then, check App.vue's `@closeTheModal` listener (in the template section's < Modal /> element) - the method `toggleModal` is being bound to this listener, so that when the event fires, the method is triggered.
> - In this specific instance, `toggleModal` inverts the value of App.vue's `showModal` prop/data property ... which Vue, in turn, reads (because of the HTML element's parent < div> & it's `v-if`) and either hides or shows the child element (the 'Modal')

## Click Event Modifiers (Vid #5, 23:04)

What are they?

- Click Event Modifiers are useful if you have much more specific needs for a given event. You might want to only trigger something when a _right_ click occurs, or stop a trigger from happening when a certain element is interacted with, etc.

How do we make them?

- You need to
  1. add a modifier to the given < tempalte> element (using the `.[given modifier]` syntax)
     > Note: a list of possible modifiers should appear when you first append the `.` to a given event ...

Example:

    <template>
      <button 🚀@click.right="handleClick">
        Open!
      </button>
      <button 🚀@click.shift="handleClick">
        Open!
      </button>
    </template>

Now, the first button will only trigger our `handleClick` method it is clicked with the _right_ mouse button, and

the second will only trigger when the 'shift' key is _also_ being held down!

> - Check Modal.vue's parent < div> of the modal - it has a `.self` modifier added to it, so that only when the parent/backdrop div is clicked will the modal be hidden (and clicking on the modal box itself will do nothing/not close it)

## Slots (Vid #5, 35:51)

What are they?

- Slots allow more complicated data - specifically entire templates - into a component. For example, if you wanted to pass an entire form into another component.
  > You wouldn't use slots to pass more simple data, such as strings, booleans, etc.

How do we make them?

- For basic usage, you only need two things:

  1. whatever HTML element(s) you'd like to pass to the child component nested within that component's template element (declared in the parent element)
     > - Check App.vue's < Modal> component to find both an `< h1>` & a `< p>` element
  2. a `<slot>` tag in the child component's template. By default, anything passed in this way from the parent will be injected precisely where the slot tags are.
     > - Check Modal.vue's template for the `<slot>Default Content</slot>` - unless the parent passes template data, "Default Content" will be the string shown in the render, which allows the developer to use place-holder/fall-back content

Note: Since _anything_ - any vanilla template data - passed from the parent will be displayed where the default `<slot>` tags are, you may need something more nuanced ...

- For more advanced, targeted implementation (say, to be able to pass multiple template elements from parent to child, but display them in different places within the child's template layout), you can use "named" slots. You will need:
  1. one or more nested `< template>` elements (nested within the parent's template) with a `v-slot` property, a "name", and whatever HTML elements you want passed via that name
     > - Check App.vue's `<template v-slot:modalLinks>` element

Example:

    🚀<template v-slot:modalLinks>
        <a href="#">Sign Up Now!</a>
        <a href="#">More Info ...</a>
      </template>

Note that here, "modalLinks" is the template name ...

2. one or more slots with "name" properties equaling/matching those template names
   > - Check Modal.vue's `<slot name="modalLinks"></slot>` element. It has a parent, wrapping div for styling purposes, so ignore that "actions" div for now and instead notice that the `<slot>Default Content</slot>` before it will display the generic h1 & p elements - but this _named_ slot will display anything with the v-slot "modalLinks" name from the parent's template.

## Teleport (Vid #5, 40:08)

What is it?

- A new feature in Vue 3, the < teleport> element allows you to inject a component anywhere in the DOM - even outside of the #app element in your index.html (maybe you want all your modals to be in a seperate div with the ID of 'modals')

How do you do it?

- For any element you'd like to teleport, use 1) wrapping `<teleport>` tags with 2) a `to=` property equal to the css selector you'd like to teleport to (in the above example, maybe you have a div right after your `<div id="app">` that is `<div id="modals">`, so you'd set your teleport to target "modals")

Example:

    // (in your index.html)

    <body>
      <div id="app"></div>
    🚀<div id="modals"></div>
    </body>

    // (in your component)

    🚀<teleport to=".modals">
      <div v-if="showModal">
        <Modal />
      </div>
    </teleport>

## Custom Events with Data (Vid #6, 28:21)

What is it?

- Sometimes you may want to not only emit an event message, but also send data - maybe in order to get that data out of the child component and back to the parent component ...

How do you do it?

- In addition to regular Vue 'custom event' syntax, you can emit data as a second argument (after the message).

Example:

    this.$emit("my message", this.someDataProp);

> - Check Project_2, `Block.vue`'s `stopTimer()` method for an example

## Two-way Data Binding (Vid #7, 05:26)

What is it?

- Generally speaking, it is when you bind template inputs and data with component prop data. If you enter your email into a field (and have used `v-model` to correctly link it to a data prop), then what gets typed will also get stored. However, this street also runs the other way - and if the data prop gets changed (via another method etc in the app), wherever said data prop is displayed in the component's template will be updated _also_.

How do you do it?

- You can use the `v-model` directive, and set it equal to a given data prop
  > - Check project_3, `SignupForm.vue`'s 'template' & 'script' sections for an example. Note that if the commented-out props were active, then you would see the template input fields they're bound to filled with their values ...

Example:

    <!-- In the 'template' section of the component ... -->
    <template>
      <form>
        <label>Email:</label>
        <input type="email" 🚀v-model="userEmail" />
      </form>
    </template>

    <!-- In the 'script' section of the component ... -->
    <script>
      export default {
        data() {
          return {
            🚀userEmail: "",
          };
        },
      };
    </script>

## Form Elements (single-input fields, multi-input fields, single check boxes, multiple check boxes, drop-down menus, and submitting forms) (Vid #7)

What is it?

- In this video, Shaun creates a nice, semi-complex form. He covers a range of form elements while also demonstrating how to use and handle _two-way data binding_, _keyboard events_, and _bespoke submission logic_.

How do you do it?

- In this case, the best thing to do is go look at `project_3`

## Route Parameters (Vid #8, 26:00)

What are they?

- the `id` at the end of a route (usually in the form of `/jobs/:id`)

## Fetching Data (Vid #9, 1:16)

In this video, we use the JSON Server library. This library allows us to supplement a given .json file for a real API/database - wrapping the file in auto-generated API endpoints.

    {
      "blogs": [
        {"title": "new site design", "id": 1},
        {"title": "dev job stats", "id": 2},
        {"title": "tech party 2022", "id": 3}
      ]
    }

In order to use [json Server](https://www.npmjs.com/package/json-server) ...

1. Install the package via `npm install json-server` (`npm install -g json-server` to do it globally)
2. Start it with `json-server --watch db.json`

Notes:

- You can name your db file whatever you want, so long as its file extension is `.json`
- Creating a 'data' folder that stores this file is a good practice in order to keep your app clean etc.
- I like to add a script command to `package.json`:

  "jsonServer": "npx json-server --watch data/db.json"
  // Note the use of 'npx' for windows

## Computed Values (Vid #10, 26:00)

What is it?

- Computed Values allow you to combine the logic of a function and the data storage of a refrence object into one, read-only element.
- **Note:** computed refrence objects are read-only/one-way data-bound. That is to say, you cannot make them completely dynamic and let user's store their inputs in them _directly_ ... however, user inputs and other changes made to refrence objects that your `computed()`'s logic is relying on _will_ update the value of the given `computed()` refrence object.

How do you do it?

- `const myRefObject = computed(() => {...some logic; return a value, which will be stored in myRefObject})
  > - Check project_5

Example:

    const myName = computed(() => {
          return "James";
        });

> Here, no complicated function logic occurs - but our function _does_ still return a string value of "James". We cannot update `myName`'s value, but it _can_ be read.

or

    onst search = ref("")

    const characters = ref([
      "Mario",
      "Yoshi",
      "Luigi",
    ]);

    const matchingNames = computed(() => {
      return characters.value.filter((name) => name.includes(search.value));
    });

> Here, we _are_ doing some complicated logic. Moreover, if 1) any changes are made to the `search` ref. obj., our computed() logic will run `.filter` on the `characters` ref. obj. and return a new value to the `matchingNames` ref. obj. The two-way databinding of `search`, combined with `matchingNames`'s logic effectively makes the latter _one-way data-bound_, which can be quite useful!

TEMPLATE for further notes:

## REPLACE (Vid #1, 00:00)

What is it?

-

How do you do it?

- f
  > - Check project_1,

Example:
