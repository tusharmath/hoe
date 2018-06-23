/**
 * Created by tushar on 15/01/17.
 */
import * as Benchmark from 'benchmark'
import {create} from '../hoe'
var suite = new Benchmark.Suite()

function pass() {}
suite
  .add('emit-1e6-times', function() {
    const e = create(pass)
    for (var i = 0; i < 1e6; ++i) {
      e.emit(i)
    }
  })
  .on('cycle', function(event: any) {
    console.log(String(event.target))
  })
  .run()
