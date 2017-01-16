# HOE - Higher Order Events

[![Build Status](https://travis-ci.org/tusharmath/hoe.svg?branch=master)](https://travis-ci.org/tusharmath/hoe)

A typesafe higher order event emitter.

## Installation

```bash
yarn add hoe 
```
*use yarn, because its simply better :)*


## Usage

```ecmascript 6
import {hoe} from 'hoe'

// Create emitter
const e = hoe((ev) => console.log(ev))

e.emit(10) 
e.emit(20)

/** 
  * OUTPUT
  * 10
  * 20
  */

```

## Higher Order Event Emitter

```ts
const e = hoe((ev) => {
  console.log(ev)
})

const t = e.of('T')
const s = t.of('S')
t.emit(10)
t.emit(20)
s.emit(30)
s.emit(40)

/**
 * {type: 'T', value: 10}
 * {type: 'T', value: 20}
 * {type: 'T', value: {type: 'S', value: 20}}
 * {type: 'T', value: {type: 'S', value: 20}}
 */
```
