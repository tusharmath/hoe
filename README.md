# HOE - Higher Order Events

[![Build Status](https://travis-ci.org/tusharmath/hoe.svg?branch=master)](https://travis-ci.org/tusharmath/hoe)

HOE is an event handler especially designed keeping virtual dom libraries in mind.

# Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Action](#action)
- [Example](#example)
- [API](#api)

# Installation

**via npm:**
```bash
$ npm install hoe --save
```

**via CDN:**
```html
<script src="https://unpkg.com/hoe/dist/hoe.js"></script>
```


# Usage

```jsx
import * as hoe from 'hoe'

// Logs the `Actions`
const actionListener = action => {
  console.log(action)
}

// Creating a new instance
const emitter = hoe.create(actionListener)

// Sample Usage
const component = (emitter) => (
  <div>
    <button onClick={emitter.of('hello').emit}>Hello</button>
    <button onClick={emitter.of('bye').emit}>Bye</button>
  <div>
)

// vNode being returned from the component
const vNode = component(emitter)
```

On clicking on buttons, the `actionListener` logs the following `Action`s —

```js
// Hello
{type: 'hello', value: [ClickEvent]}

// Bye
{type: 'bye', value: [ClickEvent]}
```

The `value` in this case is the actual click event.

# Action
HOE converts DOM Events into an `Action`. An `Action` has two properties —

 - `type` : Its a `string|number` identifier which depicts the originator of event. For example — if an event is fired from the side navigation, the corresponding `Action` could have a `type` as `SIDE_NAV`.
 - `value`: Value is the payload that needs to be transmitted via the `Action`. In most cases it would be the DOM event. In some cases the value it self could be an `Action`. This is especially useful when the nesting of components is really deep and one would like to namespace actions based on the hierarchy of components.


# Example

- [Deeply nested components](https://jsfiddle.net/9mmLu22n/)
- [Dynamically created stateful components](https://jsfiddle.net/pfc9r2o7/11/)

# API

## hoe.create(actionListener)

This is the constructor function for creating the action emitter. It takes in a single listener and returns an instance of `Hoe`.

**Usage**
```js
import * as hoe from 'hoe'

const actionListener = (event) => {
  // do something with that event
}

const emitter = hoe.create(actionListener) // returns a Hoe
```

## emitter.of(type)

It takes in a `type` which is of type `string|number` and returns a new instance of `Hoe`. For Eg:

```js
import * as hoe from 'hoe'

const h0 = hoe.create(listener)
const h1 = h0.of('A').of('B').of('C')
```

## emitter.emit(value)

It is available on all `Hoe` instances. It takes in any `value` and based on the `type` it dispatches an `action`.
