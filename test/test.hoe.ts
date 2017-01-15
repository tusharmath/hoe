/**
 * Created by tushar on 15/01/17.
 */
import test from 'ava'
import {hoe, Action, Emitter, action} from '../hoe'

export const testListener = () => {
  const actions: Array<any> = []
  const listener = (action: Action<any>, emitter: Emitter<any>) => {
    actions.push(action)
  }
  return {actions, listener}
}

test(t => {
  const {actions, listener} = testListener()
  const e = hoe(listener)
  e
    .emit(100)
    .emit(200)
  t.deepEqual(actions, [100, 200])
})

test('scope', t => {
  const {actions, listener} = testListener()
  const e = hoe(listener).of('T')
  e
    .emit(100)
    .emit(200)
  t.deepEqual(actions, [
    action('T', 100),
    action('T', 200)
  ])
})
