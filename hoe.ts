/**
 * Created by tushar on 15/01/17.
 */

import {action} from 'action-type'

export interface Hoe {
  of(type: string | number): Hoe
  emit(obj: any): void
}

class DefaultEmitter implements Hoe {
  constructor(
    readonly type: string | number,
    readonly parent: DefaultEmitter | RootEmitter
  ) {}

  emit = (value: any) => {
    var node: DefaultEmitter | RootEmitter = this
    var act = value
    while (node instanceof DefaultEmitter) {
      act = action(node.type, act)
      node = node.parent
    }
    node.emit(act)
  }
  of(type: string | number): Hoe {
    return new DefaultEmitter(type, this)
  }
}

class RootEmitter implements Hoe {
  constructor(public readonly emit: (obj: any) => void) {}

  of(type: string | number): Hoe {
    return new DefaultEmitter(type, this)
  }
}

export const create = (listener: (obj: any) => any): Hoe => {
  return new RootEmitter(listener)
}
