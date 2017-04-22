/**
 * Created by tushar on 15/01/17.
 */

///<reference path="global.d.ts"/>

export interface MapFunction<A, B> {
  (a: A): B
}

export interface ListenerFunction<T> {
  (value: T): void
}

abstract class BaseEmitter<T> implements Hoe {

  of<S> (fn: MapFunction<T, S>): Hoe {
    return new DefaultEmitter(fn, this)
  }

  abstract emit: ListenerFunction<T>
}

class DefaultEmitter<T> extends BaseEmitter<T> {
  constructor (private fn: MapFunction<any, any>,
               private parent: Hoe) {
    super()
  }

  emit = <A> (value: A) => {
    return this.parent.emit(this.fn(value))
  }
}

class RootEmitter<T> extends BaseEmitter<T> {
  constructor (public readonly emit: ListenerFunction<T>) {
    super()
  }
}

export const hoe = <T> (listener: ListenerFunction<T>): Hoe => {
  return new RootEmitter(listener)
}

