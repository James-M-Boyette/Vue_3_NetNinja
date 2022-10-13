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

## Vue Syntax:

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

## Directives:

Vue Directives include a number of tools that allow you to manipulate and pass data between components, interact-with and update the DOM, etc. They are not the same as 'hooks'.

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

## Template Refs (Vid #4, 25:25)

What are "Template Refs"?

- `Template Refs` allow us to store DOM elements inside a variable in order to specifically target them with the rest of our code - like we'd normally do with vanilla DOM targeting.

How to use "Template Refs"?

- In order to make a given `< template>` element within a component targetable, give that element a `ref` property, such as `ref="whatever name you want"`, and then refrence/target it in your component's script methods using `this.$refs` syntax:

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

- It's a good practice to name your components with an innitial Capital letter (Footer.vue vs footer.vue) so that you avoid conflicts in your template with vanilla HTML elements (if you had a footer.vue, then you'd get a conflict error when using it in a given component's template, bc it wouldn't know whether to use your 'footer' component or the vanilla HTML 'footer' element)
- In order to style _only_ the elements in a given component's `<template>`, you can do one of three things: you can either

  1. add the Vue `scoped` property to the component's styling:

    <style scoped> </style>

  2. or you can make the styling more specific (by giving additional classes, IDs etc)

    <style> .modal h1 {...} </style>

  3. or you can just create .css style sheets and import them into your main.js:
     `import "./assets/global.css";`

  > You might want to consider doing either the second or third options because there's a slight performance hit when injected styling has to be rendered ...

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
  > - Check project_3,

Example:

## Route Parameters (Vid #8, 26:00)

What are they?

- the `id` at the end of a route (usually in the form of `/jobs/:id`)

## Fetching Data (Vid #9, 1:16)

In this video, we use the JSON Server library. This library allows us to supplement a given .json file for a real API/database. - wrapping the file in auto-generated API endpoints.

    {
      "blogs": [
        {"title": "new site design", "id": 1},
        {"title": "dev job stats", "id": 2},
        {"title": "tech party 2022", "id": 3}
      ]
    }

## BLAH (Vid #8, 26:00)

What is it?

-

How do you do it?

- f
  > - Check project_3,

Example:

## BLAH (Vid #8, 26:00)

What is it?

-

How do you do it?

- f
  > - Check project_3,

Example:
