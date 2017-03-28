/**
 * Created by tushar on 15/01/17.
 */

///<reference path="global.d.ts"/>

interface MapFunction<A, B> {
  (a: A): B
}

class DefaultAction<T> implements Action<T> {
  constructor (public readonly type: string,
               public readonly value: T) {
  }
}

class Cache {
  private cache: {[n: string]: Hoe} = {}

  constructor (private enabled: boolean = true) {
  }

  has (key: string) {
    return this.enabled && Boolean(this.cache[key])
  }

  get (type: string) {
    return this.cache[type]
  }

  set (key: string, value: Hoe) {
    if (!this.enabled) return value
    this.cache[key] = value
    return value
  }
}

const resolveEmitter = (fn: MapFunction<any, any>,
                        parent: Hoe,
                        opt: HoeOptions) => {
  return new DefaultEmitter(fn, parent, opt)
}

const actionFrom = (type: string) => action.bind(null, type)

abstract class BaseEmitter implements Hoe {
  private cache = new Cache(this.opt.cache)

  constructor (private opt: HoeOptions) {}

  of (type: string): Hoe {
    if (this.cache.has(type)) return this.cache.get(type)
    return this.cache.set(type, this.map(actionFrom(type)))
  }

  map<A, B> (fn: MapFunction<A, B>): Hoe {
    return resolveEmitter(fn, this, this.opt)
  }

  abstract emit: EmitFunction
}

class DefaultEmitter extends BaseEmitter {
  constructor (private fn: MapFunction<any, any>,
               private parent: Hoe,
               opt: HoeOptions) {
    super(opt)
  }

  emit = <A> (value: A) => {
    return this.parent.emit(this.fn(value))
  }
}

class RootEmitter extends BaseEmitter {
  constructor (public readonly emit: EmitFunction,
               opt: HoeOptions) {
    super(opt)
  }
}

export const hoe = (listener: EmitFunction, opt: HoeOptions = {cache: false}): Hoe => {
  return new RootEmitter(listener, opt)
}

export const action = <T> (type: string, value: T): Action<T> => new DefaultAction(type, value)
