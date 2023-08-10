# helpmate
Helpmate - A collection of various helper functions for Browser and Node.js

## Example Usages

```js
// Recommended:
import { retryNTimesWithDelay } from 'helpmate/dist/scheduler/retryNTimesWithDelay.js';
const { retryNTimesWithDelay } = require('helpmate/dist/scheduler/retryNTimesWithDelay.cjs');

// Grouped:
import { scheduler } from 'helpmate/dist/scheduler/index.js';
const { scheduler } = require('helpmate/dist/scheduler/index.cjs');

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

import { copyToClipboard } from 'helpmate/dist/browser/copyToClipboard.js';
import { getBrowser } from 'helpmate/dist/browser/getBrowser.js';
import { browser } from 'helpmate/dist/browser/index.js';

import { alertDialog } from 'helpmate/dist/dom/alertDialog.js';
import { forceBlur } from 'helpmate/dist/dom/forceBlur.js';
import { dom } from 'helpmate/dist/dom/index.js';

import { isValidEmail } from 'helpmate/dist/forms/isValidEmail.js';
import { forms } from 'helpmate/dist/forms/index.js';

import { updateFileIfRequired } from 'helpmate/dist/fs/updateFileIfRequired.js';
import { fs } from 'helpmate/dist/fs/index.js';

import { createUsePrevious } from 'helpmate/dist/hooks/createUsePrevious.js';
import { hooks } from 'helpmate/dist/hooks/index.js';

import { noteDown } from 'helpmate/dist/logger/noteDown.js';
import { logger } from 'helpmate/dist/logger/index.js';

import { humanReadableByteSize } from 'helpmate/dist/misc/humanReadableByteSize.js';
import { trackTime } from 'helpmate/dist/misc/trackTime.js';
import { misc } from 'helpmate/dist/misc/index.js';

import { occasionally } from 'helpmate/dist/scheduler/occasionally.js';
import { retryNTimesWithDelay } from 'helpmate/dist/scheduler/retryNTimesWithDelay.js';
import { timeout } from 'helpmate/dist/scheduler/timeout.js';
import { scheduler } from 'helpmate/dist/scheduler/index.js';

import { isValidUuidV4 } from 'helpmate/dist/uuid/isValidUuidV4.js';
import { randomUUID } from 'helpmate/dist/uuid/randomUUID.js';
import { uuid } from 'helpmate/dist/uuid/index.js';

import { isLoadedInDeveloperMode } from 'helpmate/dist/webextensions/isLoadedInDeveloperMode.js';
import { webextensions } from 'helpmate/dist/webextensions/index.js';

import { helpmate } from 'helpmate/dist/index.js';
import { helpmate } from 'helpmate';


// Load with "require" syntax:

const { sortArrayOfObjectsByProperty } = require('helpmate/dist/array/sortArrayOfObjectsByProperty.cjs');
const { array } = require('helpmate/dist/array/index.cjs');

const { eachOfLimitInOrder } = require('helpmate/dist/async/eachOfLimitInOrder.cjs');
const { async } = require('helpmate/dist/async/index.cjs');

const { copyToClipboard } = require('helpmate/dist/browser/copyToClipboard.cjs');
const { getBrowser } = require('helpmate/dist/browser/getBrowser.cjs');
const { browser } = require('helpmate/dist/browser/index.cjs');

const { alertDialog } = require('helpmate/dist/dom/alertDialog.cjs');
const { forceBlur } = require('helpmate/dist/dom/forceBlur.cjs');
const { dom } = require('helpmate/dist/dom/index.cjs');

const { isValidEmail } = require('helpmate/dist/forms/isValidEmail.cjs');
const { forms } = require('helpmate/dist/forms/index.cjs');

const { updateFileIfRequired } = require('helpmate/dist/fs/updateFileIfRequired.cjs');
const { fs } = require('helpmate/dist/fs/index.cjs');

const { createUsePrevious } = require('helpmate/dist/hooks/createUsePrevious.cjs');
const { hooks } = require('helpmate/dist/hooks/index.cjs');

const { noteDown } = require('helpmate/dist/logger/noteDown.cjs');
const { logger } = require('helpmate/dist/logger/index.cjs');

const { humanReadableByteSize } = require('helpmate/dist/misc/humanReadableByteSize.cjs');
const { trackTime } = require('helpmate/dist/misc/trackTime.cjs');
const { misc } = require('helpmate/dist/misc/index.cjs');

const { occasionally } = require('helpmate/dist/scheduler/occasionally.cjs');
const { retryNTimesWithDelay } = require('helpmate/dist/scheduler/retryNTimesWithDelay.cjs');
const { timeout } = require('helpmate/dist/scheduler/timeout.cjs');
const { scheduler } = require('helpmate/dist/scheduler/index.cjs');

const { isValidUuidV4 } = require('helpmate/dist/uuid/isValidUuidV4.cjs');
const { randomUUID } = require('helpmate/dist/uuid/randomUUID.cjs');
const { uuid } = require('helpmate/dist/uuid/index.cjs');

const { isLoadedInDeveloperMode } = require('helpmate/dist/webextensions/isLoadedInDeveloperMode.cjs');
const { webextensions } = require('helpmate/dist/webextensions/index.cjs');

const { helpmate } = require('helpmate/dist/index.cjs');
const { helpmate } = require('helpmate');
```

## List of files

```
src/array/sortArrayOfObjectsByProperty.js
src/array/index.js

src/async/eachOfLimitInOrder.js
src/async/index.js

src/browser/copyToClipboard.js
src/browser/getBrowser.js
src/browser/index.js

src/dom/alertDialog.js
src/dom/forceBlur.js
src/dom/index.js

src/forms/isValidEmail.js
src/forms/index.js

src/fs/updateFileIfRequired.js
src/fs/index.js

src/hooks/createUsePrevious.js
src/hooks/index.js

src/logger/noteDown.js
src/logger/index.js

src/misc/humanReadableByteSize.js
src/misc/trackTime.js
src/misc/index.js

src/scheduler/occasionally.js
src/scheduler/retryNTimesWithDelay.js
src/scheduler/timeout.js
src/scheduler/index.js

src/uuid/isValidUuidV4.js
src/uuid/randomUUID.js
src/uuid/index.js

src/webextensions/isLoadedInDeveloperMode.js
src/webextensions/index.js

src/index.js
```
