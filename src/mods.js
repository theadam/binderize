export const mod = m => function(...margs) {
  const top = this;
  return function(app) {
    const wrapper = top || this || id;
    return wrapper(function(fn, ...args) {
      return m(...margs, app, this, ...[fn].concat(args));
    });
  }
}

export const on = mod(function(field, app, _this, ...args) {
  return {..._this, [field]: app.apply(_this[field], args)};
});

export const promise = mod(function(app, _this, ...args) {
  return _this.then(v => app.apply(v, args));
})();

export const maybe = mod(function(app, _this, ...args) {
  if(_this === null || _this === undefined) return _this;
  return app.apply(_this, args);
})();

export const map = mod(function(app, _this, ...args) {
  return _this.map(a => app.apply(a, args));
})();
