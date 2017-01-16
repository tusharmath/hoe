/**
 * Created by tushar on 15/01/17.
 */

/**
 * Emitter can dispatch values of only one type. It could be a DOM Event or an action or a number doesn't matter,
 * the type can not be changed at run time.
 */
export interface Emitter {
  of (type: string): Emitter
  emit <T> (value: T): void
}

/**
 * Actions are essentially a tuple of value + type.
 */
export class Action<T> {
  constructor (public readonly type: string,
               public readonly value: T) {
  }

  static of <T> (type: string, value: T) {
    return new Action(type, value)
  }
}

/**
 * Handler for events
 */
export interface Listener<T> {
  (action: T, emitter: Emitter): void
  (action: T): void
}


/**
 * Dispatches values of type [T]
 */
export class DefaultEmitter<T> implements Emitter {
  constructor (private type: string, private parent: Emitter) {
  }

  of (type: string): Emitter {
    return new DefaultEmitter(type, this)
  }

  emit (value: T) {
    this.parent.emit(new Action(this.type, value))
  }
}

export class RootEmitter<T> implements Emitter {

  constructor (private listener: Listener<T>) {
  }

  of (type: string): Emitter {
    return new DefaultEmitter(type, this)
  }

  emit = (value: T) => {
    this.listener(value, this)
  }
}

export const hoe = <T> (listener: Listener<T>): Emitter => {
  return new RootEmitter(listener)
}