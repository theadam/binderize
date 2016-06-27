# Binderize - Experimenting with function bind syntax

Interested in using the new [function bind syntax](https://github.com/zenparsing/es-function-bind) but none of your functions are compatible?  Binderize them!

### Converting the [lodash chain example](https://lodash.com/docs#chain)

```javascript
import { bindFirst } from 'binderize';
import _ from 'lodash';

const { sortBy, map, head } = _.mapValues(_, bindFirst);

var users = [
  { 'user': 'barney',  'age': 36 },
  { 'user': 'fred',    'age': 40 },
  { 'user': 'pebbles', 'age': 1 }
];

var youngest = users
  ::sortBy('age')
  ::map(o => o.user + ' is ' + o.age)
  ::head();
// → 'pebbles is 1'
```

### The same example with Ramda

```javascript
import { bindLast } from 'binderize';
import R from 'ramda';

const { sortBy, map, head } = R.map(bindLast, R);

var users = [
  { 'user': 'barney',  'age': 36 },
  { 'user': 'fred',    'age': 40 },
  { 'user': 'pebbles', 'age': 1 }
];

var youngest = users
  ::sortBy(o => o.age)
  ::map(o => o.user + ' is ' + o.age)
  ::head();
// → 'pebbles is 1'
```

Now you can use your favorite libraries and functions with this new syntax.

### Converting a [pipeline operator example](https://github.com/mindeavor/es-pipeline-operator#introduction)

```javascript
const doubleSay = bind(str => {
  return str + ", " + str;
});

const capitalize = bind(str => {
  return str[0].toUpperCase() + str.substring(1);
});

const exclaim = bind(str => {
  return str + '!';
});

"hello"
  ::doubleSay
  ::capitalize
  ::exclaim; // "Hello, hello!"
```

## Binder API
Each binder takes a function and allows it to accept one of its arguments as its `this` context, instead of regularly passed argument.  The rule of thumb is to use the binder that corresponds to the argument you want to be on the left of the bind (`::`).

#### bind
Converts a single argument function that accepts that argument as its `this` context.

```javascript
const head = bind(list => list[0]);

[1, 2, 3]::head(); // 1
```

#### bindFirst
Converts a function to one where the `this` context is passed as the first argument to the wrapped function.

```javascript
const append = bindFirst((list, a) => [...list, a]);

[1, 2, 3]::append(4); // [1, 2, 3, 4]
```

#### bindLast
Converts a function to one where the `this` context is passed as the last argument to the wrapped function.

```javascript
const append = bindLast((a, list) => [...list, a]);

[1, 2, 3]::append(4); // [1, 2, 3, 4]
```

#### bindN
Converts a function to one where the `this` context is passed as the Nth argument to the wrapped function.

```javascript
const greet = bindN(1, (greeting, name, ending) => `${greeting} ${name}, ${ending}`);

"Adam"::greet("Hello", "how are you?"); // "Hello Adam, how are you?";
```

## Modifiers - (Experimental)

Modifiers can be used to enable functions to work in more contexts than they were originally defined.  You get a higher level of functionality with the same sugary function bind syntax.  These modifiers can also be stacked to lift to combine these contexts.  Import these from `binderize/modifiers`.

```javascript
import { ... } from 'binderize/modifiers'
```

These are experimental, and I am not sure how useful they will be.  Any ideas are welcome!

#### maybe
Allows a function to not be called when the payload is null or undefined to avoid exceptions

```javascript
const upcase = x => x.toUpperCase();
const maybeUpcase = maybe::bind(upcase);

null::maybeUpcase() // null / Does not throw an error
"test"::maybeUpdate() // "TEST"
```

#### on
Allows a function to run with a certain field of an object as the payload.  The original payload is not modified.

```javascript
const increment = x => x + 1;
const growOlder = on('age')::bind(increment);

const user = { name: 'Adam', age: 28 };
user::growOlder() // { name: 'Adam', age: 29 };
```

#### promise
Allows the function to treat the result of a promise as its payload.

```javascript
const log = ::console.log;
const logPromise = promise::bind(log);

Promise.resolve(1)::logPromise(); // logs 1 when the promise resolves
```

#### map
Maps the function over the payload.

```javascript
const increment = x => x + 1;
const incrementAll = map::bind(increment);

[1, 2, 3]::incrementAll() // [2, 3, 4]
```

### Stacking / Chaining
As mentioned these modifiers can be chained.  Imagine pulling a list of users back from an API, incrementing a nullable age variable (or leaving it null), then sending the updated users back to the API.  You can use a stack of modifiers to lift a simple function like `increment` into the context you want it to work in.  This makes for a very declarative way of creating functions with complex functionality.

```javascript
const increment = x => x + 1;
// When the promise resolves (promise)
// for each value (map)
// on the age field (on)
// maybe (maybe) increment the value
const incrementUsers = promise::map::on('age')::maybe::bind(increment);

getUsersAsPromise()::incrementAllAges().then(saveUsers);
```

If our API returns this list of users:
```json
[
  {
    "id": 1,
    "age": 10
  },
  {
    "id": 2,
    "age": null
  }
]
```

This updated list will be passed to the `saveUsers` function above:

```json
[
  {
    "id": 1,
    "age": 11
  },
  {
    "id": 2,
    "age": null
  }
]
```

Stacking can also be used in other creative ways and even combined with the different `apply` functions in binderize (`apply`, `applyFirst`, `applyLast`, `applyN`) to create some other useful functionality.

`safeThen` implicitly handles `null` / `undefined` values in promises.

```javascript
const safeThen = promise::maybe(apply);

Promise.resolve(null)::safeThen(x => x.toUpperCase()).then(x => console.log(x)); // logs null - Does not error
Promise.resolve("test")::safeThen(x => x.toUpperCase()).then(x => console.log(x)); // logs "TEST"
```

## License

MIT
