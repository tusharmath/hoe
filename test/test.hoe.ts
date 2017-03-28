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

test('cache: true', t => {
  const {listener, actions} = testListener()
  const e = hoe(listener, {cache: true})
  t.is(e.of('A'), e.of('A'))
  t.is(e.of('A').of('B'), e.of('A').of('B'))
  e.of('A').of('B').of('A').emit(0)
  t.deepEqual(actions, [
    action('A', action('B', action('A', 0)))
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

test('map() cache:true', t => {
  const {actions, listener} = testListener()
  const e = hoe(listener, {cache: true})
  const a1 = e.of('A').map((i: number) => i + 1000)
  const a0 = e.of('A').map((i: number) => i + 2000)
  a1.emit(1)
  a0.emit(2)
  t.deepEqual(actions, [
    action('A', 1001),
    action('A', 2002)
  ])
})

test('cache: true', t => {
  const {listener, actions} = testListener()
  const e = hoe(listener, {cache: true})
  e.of('A').of('B').of('A').emit(0)
  t.deepEqual(
    actions, [
      action('A', action('B', action('A', 0)))
    ])
})
