/**
 * Created by tushar on 15/01/17.
 */

export type OPT = {
  cache: boolean
}

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
}

export abstract class CachableEmitter implements Emitter {
  private cache = new Map<string, Emitter>()

  constructor (private opt: OPT) {
  }

  private create (type: string) {
    return new DefaultEmitter(type, this, this.opt)
  }

  of (type: string): Emitter {
    if (this.opt.cache === false) return this.create(type)
    if (this.cache.has(type)) return this.cache.get(type)
    const d = this.create(type)
    this.cache.set(type, d)
    return d
  }

  public emit: {<T> (t: T): void}
}

/**
 * Dispatches values of type [T]
 */
export class DefaultEmitter<T> extends CachableEmitter {
  constructor (private type: string, private parent: Emitter, opt: OPT) {
    super(opt)
  }

  emit = (value: T) => {
    return this.parent.emit(new Action(this.type, value))
  }
}

export class RootEmitter<T> extends CachableEmitter {
  constructor (private listener: Listener<T>, opt: OPT) {
    super(opt)
  }

  emit = (value: T) => {
    return this.listener(value, this)
  }
}

export const hoe = <T> (listener: Listener<T>, opt: OPT = {cache: false}): Emitter => {
  return new RootEmitter(listener, opt)
}