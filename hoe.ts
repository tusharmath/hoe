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
export interface Listener {
  (action: any, emitter: Emitter): void
}

export class Cache {
  private cache: {[n: string]: Emitter} = {}

  has (type: string) {
    return Boolean(this.cache[type])
  }

  get (type: string) {
    return this.cache[type]
  }

  set (type: string, e: Emitter) {
    this.cache[type] = e
    return e
  }
}

export const resolveEmitter = (opt: OPT, type: string, cache: Cache, emitter: Emitter) => {
  if (opt.cache === false) return new DefaultEmitter(type, emitter, opt)
  if (cache.has(type)) return cache.get(type)
  return cache.set(type, new DefaultEmitter(type, emitter, opt))
}

export class DefaultEmitter implements Emitter {
  private cache = new Cache()

  constructor (private type: string,
               private parent: Emitter,
               private opt: OPT) {
  }

  of (type: string): Emitter {
    return resolveEmitter(this.opt, type, this.cache, this)
  }

  emit = <T> (value: T) => {
    return this.parent.emit(new Action(this.type, value))
  }
}

export class RootEmitter implements Emitter {
  private cache = new Cache()

  constructor (private listener: Listener, private opt: OPT) {
  }

  of (type: string): Emitter {
    return resolveEmitter(this.opt, type, this.cache, this)
  }

  emit = <T> (value: T) => {
    return this.listener(value, this)
  }
}

export const hoe = (listener: Listener, opt: OPT = {cache: false}): Emitter => {
  return new RootEmitter(listener, opt)
}