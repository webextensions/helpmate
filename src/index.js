import { array } from './array/index.js';
import { async } from './async/index.js';
import { browser } from './browser/index.js';
import { dom } from './dom/index.js';
import { fs } from './fs/index.js';
import { hooks } from './hooks/index.js';
import { logger } from 'note-down';
import { misc } from './misc/index.js';
import { scheduler } from './scheduler/index.js';
import { uuid } from './uuid/index.js';
import { webextensions } from './webextensions/index.js';

const helpmate = {
    array,
    async,
    browser,
    dom,
    fs,
    hooks,
    logger,
    misc,
    scheduler,
    uuid,
    webextensions
};

export { helpmate };
