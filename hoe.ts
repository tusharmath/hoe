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

const resolveEmitter = (fn: MapFunction<any, any>,
                        parent: Hoe) => {
  return new DefaultEmitter(fn, parent)
}

const actionFrom = (type: string) => action.bind(null, type)

abstract class BaseEmitter implements Hoe {
  of (type: string): Hoe {
    return this.map(actionFrom(type))
  }

  map<A, B> (fn: MapFunction<A, B>): Hoe {
    return resolveEmitter(fn, this)
  }

  abstract emit: EmitFunction
}

class DefaultEmitter extends BaseEmitter {
  constructor (private fn: MapFunction<any, any>,
               private parent: Hoe) {
    super()
  }

  emit = <A> (value: A) => {
    return this.parent.emit(this.fn(value))
  }
}

class RootEmitter extends BaseEmitter {
  constructor (public readonly emit: EmitFunction) {
    super()
  }
}

export const hoe = (listener: EmitFunction): Hoe => {
  return new RootEmitter(listener)
}

export const action = <T> (type: string, value: T): Action<T> => new DefaultAction(type, value)
