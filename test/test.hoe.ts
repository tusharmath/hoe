/**
 * Created by tushar on 15/01/17.
 */
import test from 'ava'
import {create, action, isAction} from '../hoe'

export const testListener = () => {
  const actions: Array<any> = []
  const listener = (action: any) => {
    actions.push(action)
  }
  return {actions, listener}
}

test(t => {
  const {actions, listener} = testListener()
  const e = create(listener)
  e.emit(100)
  e.emit(200)
  t.deepEqual(actions, [100, 200])
})

test('of()', t => {
  const {actions, listener} = testListener()
  const e = create(listener).of('T')
  e.emit(100)
  e.emit(200)
  t.deepEqual(actions, [
    action('T', 100),
    action('T', 200)
  ])
})

test('of(A).of(B)', t => {
  const {actions, listener} = testListener()
  const e = create(listener).of('A').of('B')
  e.emit(100)
  e.emit(200)
  t.deepEqual(actions, [
    action('A', action('B', 100)),
    action('A', action('B', 200))
  ])
})

test('emit.bind()', t => {
  const {actions, listener} = testListener()
  const e = create(listener)
  const f = e.of('F')
  e.emit.call(null, 100)
  f.emit.call(null, 200)
  t.deepEqual(actions, [
    100,
    action('F', 200)
  ])
})

test('isAction()', t => {
  t.false(isAction({}))
  t.true(isAction(action('A', 'B')))
})
