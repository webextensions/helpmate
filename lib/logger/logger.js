/*eslint-env node*/
'use strict';

var util = require('util');
var chalk = require('chalk');

var prettyJSON = function (obj) {
    return JSON.stringify(obj, null, 4);
};

var disableLogging = false;

var log = function (msg) {
    if (disableLogging) {
        // do nothing
    } else {
        console.log(msg);
    }
};

var logger = {
    data: function (msg) {
        log(chalk.magenta(util.inspect(msg, {
            showHidden: false,
            depth: null,
            colors: true
        })));
    },
    debug: function (msg) {
        log(chalk.blue(msg));
    },
    error: function (msg) {
        log(chalk.red(msg));
    },
    fatal: function (msg) {
        log(chalk.bgRed(msg));
    },
    help: function (msg) {
        log(chalk.cyan(msg));
    },
    info: function (msg) {
        log(chalk.cyan(msg));
    },
    json: function (msg) {
        log(chalk.magenta(prettyJSON(msg)));
    },
    log: function (msg) {
        log(msg);
    },
    success: function (msg) {
        log(chalk.green(msg));
    },
    trace: function (msg) {
        log(chalk.yellow(msg));
    },
    todo: function (msg) {
        log(chalk.yellow(msg));
    },
    verbose: function (msg) {
        if (typeof msg !== 'string') {
            msg = util.inspect(msg, {
                showHidden: false,
                depth: null
            });
        }
        log(chalk.gray(msg));
    },
    warn: function (msg) {
        log(chalk.yellow(msg));
    }
};

logger.off = logger.disable = function () {
    disableLogging = true;
};
logger.on = logger.enable = function () {
    disableLogging = false;
};


module.exports = logger;
