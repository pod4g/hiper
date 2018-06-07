/* eslint-disable no-undef */
const EventEmitter = require('events').EventEmitter
const emitter = new EventEmitter()
emitter.setMaxListeners(200)
test('EventEmitter', () => {
  let count = 0
  let i = 0
  for (i = 0; i < 300; i++) {
    emitter.on('test', () => {
      count++
    })
  }
  emitter.emit('test')
  console.log('执行次数：', count)
  expect(count).toBe(i)
})
