export type Integer = number & { __is_int: void }
export function Integer (n: number): Integer {
  if (n === Math.floor(n) && n >= 0) {
    return n as Integer
  }
  throw TypeError('n is NOT an Integer')
}
