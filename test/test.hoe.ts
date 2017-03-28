/**
 * Created by tushar on 15/01/17.
 */
import test from 'ava'
import {action, hoe} from '../hoe'

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
  const f = e.of('F')
  e.emit.call(null, 100)
  f.emit.call(null, 200)
  t.deepEqual(actions, [
    100,
    action('F', 200)
  ])
})

test('cache: false', t => {
  const {listener} = testListener()
  const e = hoe(listener)
  t.false(e.of('A') === e.of('A'))
  t.false(e.of('A').of('B') === e.of('A').of('B'))
})

test('map()', t => {
  const {actions, listener} = testListener()
  const e = hoe(listener)
  const f = e.of('A').of('B').map((x: number) => [x, 'K']).of('C')
  f.emit(1)
  f.emit(2)
  t.deepEqual(actions, [
    action('A', action('B', [action('C', 1), 'K'])),
    action('A', action('B', [action('C', 2), 'K']))
  ])
})
