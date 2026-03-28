export function assert(
  val: unknown,
  msg: string = 'Assertion failed',
): asserts val {
  if (!val) throw new Error(msg)
}

export function asserted<T>(val: T, msg?: string) {
  assert(val, msg)
  return val
}

assert.equal = function assertEqual<T>(l: T, r: T, msg?: string): void {
  if (l != r) throw new Error(msg || 'Assertion failed: ' + l + ' != ' + r)
}
