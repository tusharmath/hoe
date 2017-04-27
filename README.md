# HOE - Higher Order Events

[![Build Status](https://travis-ci.org/tusharmath/hoe.svg?branch=master)](https://travis-ci.org/tusharmath/hoe)

HOE is an emitter for deeply nested components. It does so by internally converting DOM Events into `Actions`. An `Action` has three properties —
 
 - `type` : Its a string identifier which depicts the originator of event. For example — if an event is fired from the side navigation, the corresponding `Action` could have a `type` as `SIDE_NAV`.  
 - `value`: Value is the payload that needs to be transmitted via the `Action`. In most cases it would be the DOM event. In some cases the value it self could be an `Action`. This is especially useful when the nesting of components is really deep and one would like to namespace actions based on the hierarchy of components. 
 - `id`: It's an optional value and defaults to `0`. Sometimes multiple instance of the same `type` of the component need to be used. Example — When you have to dynamically create a list of components. `id` helps differentiate in such cases.

# Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Example](#example)
- [API](#api) 

# Installation

**via npm:**
```bash
$ npm install hoe --save
```

# Usage

**CJS:**
```js
import * as hoe from 'hoe'
const emitter = hoe.create(i => console.log(i))
```

**HTML:**
```html
<script src="https://unpkg.com/hoe/dist/hoe.js"></script>
<script>
  const emitter = hoe.create(i => console.log(i))
</script>

```

# Example

- [Deeply nested views](https://jsfiddle.net/9mmLu22n/)
- [Dynamically created counters](https://jsfiddle.net/pfc9r2o7/8/)

# API

## hoe(listener)

This is the constructor function for creating the action emitter. It takes in a single listener and returns an instance of `Hoe`.

**Usage**
```js
import * as hoe from 'hoe'

const listener = (event) => {
  // do something with that event
}

hoe.create(listener) // returns a Hoe
```

## of(type, id)

It takes in two arguments a `type` which is a `string` and an `id` which is a `number`. The `id` is optional and defaults to `0`. The function returns a new instance of `Hoe`. For Eg:

```js
import * as hoe from 'hoe'

const h0 = hoe.create(listener)
const h1 = h0.of('A').of('B', 10).of('C')
```

## emit(value)

It is available on `Hoe` instances. It takes in any value and based on the `type` and the `id` dispatches an action.
