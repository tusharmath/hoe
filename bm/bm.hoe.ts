/**
 * Created by tushar on 15/01/17.
 */
import * as Benchmark from 'benchmark'
import {hoe} from '../hoe'
var suite = new Benchmark.Suite()

function passthru () {

}
console.log('```')
suite
  .add('emit-1e6-times', function () {
    const e = hoe(passthru)
    for (var i = 0; i < 1e6; ++i) {
      e.emit(i)
    }
  })

  .add('create-1e3-times', function () {
    var e = hoe(passthru)
    for (var i = 0; i < 1e3; ++i) {
      e = e.of(i.toString())
    }
    e.emit(0)
  })

  .on('cycle', function (event: any) {
    console.log(String(event.target))
  })
  .on('complete', () => console.log('```'))
  .run()