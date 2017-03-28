/**
 * Created by tushar on 22/02/17.
 */

/**
 * Emitter can dispatch values of only one type. It could be a DOM Event or an action or a number doesn't matter,
 * the type can not be changed at run time.
 */
interface Hoe {
  of (type: string): Hoe
  map <A, B>(fn: (a: A) => B): Hoe
  emit: EmitFunction
}

/**
 * Handler for events
 */
interface EmitFunction {
  <T> (action: T): void
}

/**
 * A tuple of value + type.
 */
interface Action<T> {
  type: string
  value: T
}
