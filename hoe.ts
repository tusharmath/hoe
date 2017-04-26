/**
 * Created by tushar on 15/01/17.
 */

///<reference path="global.d.ts"/>

export interface ListenerFunction<T> {
  (value: T): void
}

class DAction<T> {
  constructor (public readonly type: string,
               public readonly value: T,
               public readonly id: number) {}
}

abstract class BaseEmitter<T> implements Hoe {
  of (type: string, id: number): Hoe {
    return new DefaultEmitter(type, id, this)
  }

  abstract emit: ListenerFunction<T>
}

class DefaultEmitter<T> extends BaseEmitter<T> {
  constructor (private type: string,
               private id: number,
               private parent: Hoe) {
    super()
  }

  emit = <A> (value: A) => {
    return this.parent.emit(action(this.type, value, this.id))
  }
}

class RootEmitter<T> extends BaseEmitter<T> {
  constructor (public readonly emit: ListenerFunction<T>) {
    super()
  }
}

export const create = <T> (listener: ListenerFunction<T>): Hoe => {
  return new RootEmitter(listener)
}
export const action = <T> (type: string, value: T, id: number = 0): Action<T> => new DAction(
  type, value, id
)
