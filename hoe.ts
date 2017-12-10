/**
 * Created by tushar on 15/01/17.
 */

///<reference path="global.d.ts"/>

export interface ListenerFunction<T> {
  (value: T): void
}

class DAction<T> {
  constructor(public readonly type: ActionType, public readonly value: T) {}
}

abstract class BaseEmitter<T> implements Hoe {
  of(type: ActionType): Hoe {
    return new DefaultEmitter(type, this)
  }

  abstract emit: ListenerFunction<T>
}

class DefaultEmitter<T> extends BaseEmitter<T> {
  constructor(private type: ActionType, private parent: Hoe) {
    super()
  }

  emit = <A>(value: A) => {
    return this.parent.emit(action(this.type, value))
  }
}

class RootEmitter<T> extends BaseEmitter<T> {
  constructor(public readonly emit: ListenerFunction<T>) {
    super()
  }
}

export const create = <T>(listener: ListenerFunction<T>): Hoe => {
  return new RootEmitter(listener)
}
export const action = <T>(type: ActionType, value: T): Action<T> =>
  new DAction(type, value)

export const isAction = (val: any) => val instanceof DAction
