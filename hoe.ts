/// <reference path="global.d.ts" />

/**
 * Created by tushar on 15/01/17.
 */

import {action} from 'action-type'

class DefaultEmitter implements Hoe {
  constructor(private type: string | number, private parent: Hoe) {}

  emit = (value: any) => {
    return this.parent.emit(action(this.type, value))
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

export const create = <V>(listener: (obj: V) => V): Hoe => {
  return new RootEmitter(listener)
}
