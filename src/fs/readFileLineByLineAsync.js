import { createReadStream } from 'node:fs';

import es from 'event-stream';

// http://stackoverflow.com/questions/16010915/parsing-huge-logfiles-in-node-js-read-in-line-by-line/23695940#23695940

export const readFileLineByLineAsync = function ({
    filePath,
    onBegin,
    onLine,
    onError,
    onEnd
}) {
    return new Promise((resolve) => {
        if (onBegin) {
            onBegin();
        }

        const s = (
            createReadStream(filePath)
                .pipe(es.split())
                .pipe(
                    es
                        .mapSync(function (line) {
                            s.pause();
                            onLine(line);
                            s.resume();
                        })
                        .on('error', function (err) {
                            if (onError) {
                                onError(err);
                            }

                            resolve([err]);
                        })
                        .on('end', function () {
                            if (onEnd) {
                                onEnd();
                            }

                            resolve([null]);
                        })
                )
        );
    });
};
