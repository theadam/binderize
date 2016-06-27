# Binderize - expirimenting with function bind syntax

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


