/**
 * Created by tushar on 15/01/17.
 */

import { action } from 'action-type'

export interface ListenerFunction<T> {
  (value: T): void
}

abstract class BaseEmitter<T> implements Hoe {
  of(type: string | number): Hoe {
    return new DefaultEmitter(type, this)
  }

  abstract emit: { (value: T): void }
}

class DefaultEmitter<T> extends BaseEmitter<T> {
  constructor(private type: string | number, private parent: Hoe) {
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
