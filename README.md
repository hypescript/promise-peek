# Promise peek
[![Build Status](https://travis-ci.org/hypescript/promise-peek.svg?branch=master)](https://travis-ci.org/hypescript/promise-peek.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/hypescript/promise-peek/badge.svg?branch=master)](https://coveralls.io/github/hypescript/promise-peek?branch=master)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

Augmentation to ES6 Promise, that allows to peek at the promise results without interfering.

# Using this module in other modules

In order to augment your Promises with the peek method, you'll need to import this module:

```typescript
import "promise-peek";

new Promise((resolve, reject) => dice('1d6') === 6 ? reject('Fail!') : resolve('Success!'))
    .peek(console.info, console.error)
    .then(result => console.log(`It's a ${result}`))
    .catch(error => console.log(`It's a ${error}`))
  
```
