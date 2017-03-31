/**
 * Created by tushar on 15/01/17.
 */
import test from 'ava'
import {hoe} from '../hoe'

export const testListener = () => {
  const actions: Array<any> = []
  const listener = (action: any) => {
    actions.push(action)
  }
  return {actions, listener}
}

test(t => {
  const {actions, listener} = testListener()
  const e = hoe(listener)
  e.emit(100)
  e.emit(200)
  t.deepEqual(actions, [100, 200])
})

test('scope', t => {
  const {actions, listener} = testListener()
  const e = hoe(listener).of(x => ['T', x])
  e.emit(100)
  e.emit(200)
  t.deepEqual(actions, [
    ['T', 100],
    ['T', 200]
  ])
})

test('emit.bind()', t => {
  const {actions, listener} = testListener()
  const e = hoe(listener)
  const f = e.of(x => ['F', x])
  e.emit.call(null, 100)
  f.emit.call(null, 200)
  t.deepEqual(actions, [
    100,
    ['F', 200]
  ])
})
