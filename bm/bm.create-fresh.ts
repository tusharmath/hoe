/**
 * Created by tushar on 15/01/17.
 */
import * as Benchmark from 'benchmark'
import {create} from '../hoe'
var suite = new Benchmark.Suite()

function pass() {}
const fresh = create(pass)
console.log('```')
suite
  .add('create-1e3-times-fresh', function() {
    var e = fresh
    for (var i = 0; i < 1e3; ++i) {
      e = e.of(i.toString())
    }
    e.emit(0)
  })

  .on('cycle', function(event: any) {
    console.log(String(event.target))
  })
  .on('complete', () => console.log('```'))
  .run()
