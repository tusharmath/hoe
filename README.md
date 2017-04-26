# HOE - Higher Order Events

[![Build Status](https://travis-ci.org/tusharmath/hoe.svg?branch=master)](https://travis-ci.org/tusharmath/hoe)

<!--
understands components
-->

HOE is an action emitter for nested stateless Virtual DOM components. 

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

- [Working Demo on Code Pen]()

# API

### function: hoe()

This is the constructor function for creating the action emitter. It takes in a single listener and returns an instance of `Hoe`.

**Usage**
```js
import * as hoe from 'hoe'

const listener = (event) => {
  // do something with that event
}

hoe.create(listener) // returns a Hoe
```

### of(type, id)

It takes in two arguments a `type` which is a `string` and an `id` which is a `number`. The `id` is optional and defaults to `0`. The function returns a new instance of `Hoe`. For Eg:

```js
import * as hoe from 'hoe'

const h0 = hoe.create(listener)
const h1 = h0.of('A').of('B', 10).of('C')
```

### emit(value)

It is available on `Hoe` instances. It takes in any value and based on the `type` and the `id` dispatches an action. 
