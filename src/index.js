export function apply(fn) {
  return fn(this);
}

export function applyLast(fn, ...args) {
  return fn(...args, this);
}

export function applyFirst(fn, ...args) {
  return fn(this, ...args);
}

export function applyN(n, fn, ...args) {
  const addedArgs = args.length >= n ? 0 : n - args.length;
  const firstArgs = args.concat(Array(addedArgs));
  return fn(...firstArgs.slice(0, n), this, ...args.slice(n));
}

function papplyN(n) {
  return function(fn, ...args) {
    return applyN.apply(this, [n, fn].concat(args));
  }
}

const binder = applier => function(fn) {
  const a = this;
  return function(...args) {
    const app = a ? a(applier) : applier;
    return app.apply(this, [fn].concat(args));
  }
}

export const bindLast = binder(applyLast);
export const bindFirst = binder(applyFirst);
export const bindN = (n, fn) => binder(papplyN(n))(fn);
export const bind = binder(apply);

