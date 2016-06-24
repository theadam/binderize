export function bindlast(fn) {
  return function(...args) {
    return fn(...args, this);
  }
}

export function bindfirst(fn) {
  return function(...args) {
    return fn(...args, this);
  }
}
