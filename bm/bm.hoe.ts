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
  .add('emit-once', function () {
    hoe(passthru).emit(0)
  })

  .add('create-1000-times', function () {
    var e = hoe(passthru)
    for (var i = 0; i < 1e3; ++i) {
      e.of(i.toString())
    }
  })

  .on('cycle', function (event: any) {
    console.log(String(event.target))
  })
  .on('complete', () => console.log('```'))
  .run()