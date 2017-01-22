/**
 * Created by tushar on 22/01/17.
 */

///<reference path="typings/index.d.ts"/>

type OPT = {
  cache: boolean
}


/**
 * Emitter can dispatch values of only one type. It could be a DOM Event or an action or a number doesn't matter,
 * the type can not be changed at run time.
 */
interface Emitter {
  of (type: string): Emitter
  emit: EmitFunction
}

/**
 * Handler for events
 */
interface EmitFunction {
  <T> (action: T): void
}

