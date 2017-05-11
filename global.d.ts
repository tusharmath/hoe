/**
 * Created by tushar on 22/02/17.
 */

/**
 * Emitter can dispatch values of only one type. It could be a DOM Event or an action or a number doesn't matter,
 * the type can not be changed at run time.
 */
interface Hoe {
  of (type: ActionType): Hoe
  emit: <T> (value: T) => void
}

interface Action<T> {
  type: string | number
  value: T
}

type ActionType = string | number
