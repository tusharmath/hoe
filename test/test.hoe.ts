/**
 * Created by tushar on 15/01/17.
 */
import test from 'ava'
import {hoe, action} from '../hoe'

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
  const e = hoe(listener).of('T')
  e.emit(100)
  e.emit(200)
  t.deepEqual(actions, [
    action('T', 100),
    action('T', 200)
  ])
})

test('emit.bind()', t => {
  const {actions, listener} = testListener()
  const e = hoe(listener)
  e.emit.call(null, 100)
  t.deepEqual(actions, [100])
})
