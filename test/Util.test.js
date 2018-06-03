/* eslint-disable no-undef */
const Util = require('../src/util')
test('Util.formatMSToHumanReadable', () => {
  expect(Util.formatMSToHumanReadable(331)).toBe('331.00 ms')
  expect(Util.formatMSToHumanReadable(1000)).toBe('1.00 s')
  expect(Util.formatMSToHumanReadable(2112)).toBe('2.11 s')
  expect(Util.formatMSToHumanReadable(2116)).toBe('2.12 s')
  expect(Util.formatMSToHumanReadable(3600000)).toBe('1.00 h')
  expect(Util.formatMSToHumanReadable(3600011)).toBe('1.00 h')
  expect(Util.formatMSToHumanReadable(7200000)).toBe('2.00 h')
  expect(Util.formatMSToHumanReadable(7200000)).toBe('2.00 h')
})

test('Util.urlNormalize', () => {
  expect(Util.urlNormalize(null)).toBe('')
  expect(Util.urlNormalize(void 0)).toBe('')
  expect(Util.urlNormalize('')).toBe('')
  expect(Util.urlNormalize('http://www.diaox2.com')).toBe('http://www.diaox2.com')
  expect(Util.urlNormalize('https://www.diaox2.com')).toBe('https://www.diaox2.com')
  expect(Util.urlNormalize('www.diaox2.com')).toBe('http://www.diaox2.com')
  expect(Util.urlNormalize('//www.diaox2.com')).toBe('http://www.diaox2.com')
})
