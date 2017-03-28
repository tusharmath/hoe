/**
 * Created by tushar on 15/01/17.
 */

///<reference path="global.d.ts"/>


class DefaultAction<T> implements Action<T> {
  constructor (public readonly type: string,
               public readonly value: T) {
  }
}

class Cache {
  private cache = new Map()

  has (key: string) {
    return this.cache.has(key)
  }

  get (key: string) {
    return this.cache.get(key)
  }

  set (key: string, value: Hoe) {
    this.cache.set(key, value)
    return value
  }
}

const resolveEmitter = (opt: HoeOptions, type: string, cache: Cache, emitter: Hoe) => {
  if (opt.cache === false) return new DefaultEmitter(type, emitter, opt)
  if (cache.has(type)) return cache.get(type)
  return cache.set(type, new DefaultEmitter(type, emitter, opt))
}

class DefaultEmitter implements Hoe {
  private cache = new Cache()

  constructor (private type: string,
               private parent: Hoe,
               private opt: HoeOptions) {
  }

  of (type: string): Hoe {
    return resolveEmitter(this.opt, type, this.cache, this)
  }

  emit = <T> (value: T) => {
    return this.parent.emit(action(this.type, value))
  }
}

class RootEmitter implements Hoe {
  private cache = new Cache()

  constructor (public readonly emit: EmitFunction, private opt: HoeOptions) {
  }

  of (type: string): Hoe {
    return resolveEmitter(this.opt, type, this.cache, this)
  }
}

export const hoe = (listener: EmitFunction, opt: HoeOptions = {cache: false}): Hoe => {
  return new RootEmitter(listener, opt)
}
export const action = <T> (type: string, value: T): Action<T> => new DefaultAction(type, value)
