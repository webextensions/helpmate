# helpmate
Helpmate - A collection of various helper functions for Node.js

## Example Usages

```js
// Recommended:
import { retryNTimesWithDelay } from 'helpmate/dist/misc/retryNTimesWithDelay.js';
const { retryNTimesWithDelay } = require('helpmate/dist/misc/retryNTimesWithDelay.cjs');

// Grouped:
import { misc } from 'helpmate/dist/misc/index.js';
const { misc } = require('helpmate/dist/misc/index.cjs');

// All-in-one:
import { helpmate } from 'helpmate';
const { helpmate } = require('helpmate');
```

## List of available `import` / `require`

```js
// Load with "import" syntax:

import { sortArrayOfObjectsByProperty } from 'helpmate/dist/array/sortArrayOfObjectsByProperty.js';
import { array } from 'helpmate/dist/array/index.js';

import { eachOfLimitInOrder } from 'helpmate/dist/async/eachOfLimitInOrder.js';
import { async } from 'helpmate/dist/async/index.js';

import { getBrowser } from 'helpmate/dist/browser/getBrowser.js';
import { browser } from 'helpmate/dist/browser/index.js';

import { updateFileIfRequired } from 'helpmate/dist/fs/updateFileIfRequired.js';
import { fs } from 'helpmate/dist/fs/index.js';

import { noteDown } from 'helpmate/dist/logger/noteDown.js';
import { logger } from 'helpmate/dist/logger/index.js';

import { copyToClipboard } from 'helpmate/dist/misc/copyToClipboard.js';
import { humanReadableByteSize } from 'helpmate/dist/misc/humanReadableByteSize.js';
import { retryNTimesWithDelay } from 'helpmate/dist/misc/retryNTimesWithDelay.js';
import { timeout } from 'helpmate/dist/misc/timeout.js';
import { misc } from 'helpmate/dist/misc/index.js';

import { helpmate } from 'helpmate/dist/index.js';
import { helpmate } from 'helpmate';


// Load with "require" syntax:

const { sortArrayOfObjectsByProperty } = require('helpmate/dist/array/sortArrayOfObjectsByProperty.cjs');
const { array } = require('helpmate/dist/array/index.cjs');

const { eachOfLimitInOrder } = require('helpmate/dist/async/eachOfLimitInOrder.cjs');
const { async } = require('helpmate/dist/async/index.cjs');

const { getBrowser } = require('helpmate/dist/browser/getBrowser.cjs');
const { browser } = require('helpmate/dist/browser/index.cjs');

const { updateFileIfRequired } = require('helpmate/dist/fs/updateFileIfRequired.cjs');
const { fs } = require('helpmate/dist/fs/index.cjs');

const { noteDown } = require('helpmate/dist/logger/noteDown.cjs');
const { logger } = require('helpmate/dist/logger/index.cjs');

const { copyToClipboard } = require('helpmate/dist/misc/copyToClipboard.cjs');
const { humanReadableByteSize } = require('helpmate/dist/misc/humanReadableByteSize.cjs');
const { retryNTimesWithDelay } = require('helpmate/dist/misc/retryNTimesWithDelay.cjs');
const { timeout } = require('helpmate/dist/misc/timeout.cjs');
const { misc } = require('helpmate/dist/misc/index.cjs');

const { helpmate } = require('helpmate/dist/index.cjs');
const { helpmate } = require('helpmate');
```

## List of files

```
src/array/sortArrayOfObjectsByProperty.js
src/array/index.js

src/async/eachOfLimitInOrder.js
src/async/index.js

src/browser/getBrowser.js
src/browser/index.js

src/fs/updateFileIfRequired.js
src/fs/index.js

src/logger/noteDown.js
src/logger/index.js

src/misc/copyToClipboard.js
src/misc/humanReadableByteSize.js
src/misc/retryNTimesWithDelay.js
src/misc/timeout.js
src/misc/index.js

src/index.js
```
