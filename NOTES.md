# Notes (from videos, supplemental online research, etc.)

## Methodology

- Most routing occurs in the browser:
- An initial request is sent to the server, and a bare-bones html doc is sent back + a Vue JS bundle
- Vue therefor is an SPA (single page application)

## Terminology

- 'Widgets' = vue components, like sign-up forms, nav bars etc

- 'Directives': function a lot like 'hooks'
  - Their syntax begins with `v-on:` and is followed by the kind of event you want to listen for. For example, on an _event_ click, you could use `v-on:click`
  - You can then specify what should happen (using JS):
    > `v-on:click="age ++"
  - You can also supplement `@` for `v-on:` (so, <button @click>)

## Vue3-specific (new) features:

- The "Composition API": improves reusability, organiztion and readability of code by providing a new `setup()` function (giving access to Vue's core functionality)
- Can have _multiple_ root elements in a template (unlike React):
  `<template>
    <div> <p>Hello, World</p></div>
    <div> <p>Hello, AGAIN</p></div>
  </template>`

- The "Teleport" component:

  - Allows you to render content from one component in a _different_ place in the DOM (Useful for things like modals)

- The "Suspense" component:

  - Used to handle _async_ components easily and can provide fall-back content (e.g. a 'spinner' image) until data is loaded

- Now comes with TypeScript support right out of the box

- Multipel v-models for custom components

- Improved Reactivity

- Performance gains

## How to get started:

- If you want to install vue,

1. Run `npm init vue@latest` (and visit https://vuejs.org/guide/quick-start.html#creating-a-vue-application if you'd like to read the documentation)

- If you want to use a CDN directly in your code (and not do additional setup),

1. Insert `<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>` into your code

## Attribute Binding:

- Where you bind _dynamic attributes_ to _HTML elements_
- You can use either `v-bind` or `:` to make a given element bound to data, etc.
