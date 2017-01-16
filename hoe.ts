/**
 * Created by tushar on 15/01/17.
 */

/**
 * Emitter can dispatch values of only one type. It could be a DOM Event or an action or a number doesn't matter,
 * the type can not be changed at run time.
 */
export interface Emitter<T> {
  of <S> (type: string): Emitter<S>
  emit (value: T): void
}

/**
 * Actions are essentially a tuple of value + type.
 */
export interface Action<T> {
  readonly type: string
  readonly value: T
}

/**
 * Handler for events
 */
export interface Listener<T> {
  (action: T, emitter?: Emitter<T>): void
}

export const action = <T> (type: string, value: T): Action<T> => {
  return {
    type: type,
    value: value
  }
}


/**
 * Dispatches values of type [T]
 */
export class DefaultEmitter<T> implements Emitter<T> {
  constructor (private type: string, private parent: Emitter<Action<T>>) {
  }

  of<S> (type: string): Emitter<S> {
    return new DefaultEmitter(type, this as any)
  }

  emit (value: T) {
    this.parent.emit(action(this.type, value))
  }
}

export class RootEmitter<T> implements Emitter<T> {

  constructor (private listener: Listener<T>) {
  }

  of <S> (type: string): Emitter<S> {
    return new DefaultEmitter(type, this as any)
  }

  emit = (value: T) => {
    this.listener(value, this)
  }
}

export const hoe = <T> (listener: Listener<T>): Emitter<T> => {
  return new RootEmitter(listener)
}