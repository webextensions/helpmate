import { createReadStream } from 'node:fs';
import readline from 'node:readline';

// http://stackoverflow.com/questions/16010915/parsing-huge-logfiles-in-node-js-read-in-line-by-line/23695940#23695940

export const readFileLineByLineAsync = function ({
    filePath,
    onBegin,
    onLine,
    filterWhenOnLineReturnsTruthy = false,
    abortWhenOnLineReturnsFalsy = false,
    onProgress,
    onError,
    onEnd
}) {
    return new Promise((resolve) => {
        try {
            if (onBegin) {
                onBegin();
            }

            let lineNumber = 1; // The file line number starts at 1
            let countOfOnLineReturnedTruthy = 0;

            const filteredResults = [];

            const getStatus = ({ errored = false, aborted = false, completed = false } = {}) => {
                const status = {
                    lastLineNumberRead: (lineNumber - 1) || null,
                    countOfOnLineReturnedTruthy
                };

                if (filterWhenOnLineReturnsTruthy) {
                    status.filteredResults = filteredResults;
                }
                if (errored) {
                    status.errored = true;
                }
                if (aborted) {
                    status.aborted = true;
                }
                if (completed) {
                    status.completed = true;
                }

                return status;
            };

            try {
                const fileStream = createReadStream(filePath);
                const rl = readline.createInterface({
                    input: fileStream,
                    crlfDelay: Infinity
                });

                // Handle errors on the file stream
                fileStream.on('error', (err) => {
                    if (onError) {
                        onError(err);
                    }
                    resolve([err, getStatus({ errored: true })]);
                });

                // Process the file line by line
                (async () => {
                    try {
                        for await (const line of rl) {
                            const result = onLine(line, lineNumber);

                            if (result) {
                                if (filterWhenOnLineReturnsTruthy) {
                                    filteredResults.push({
                                        lineNumber,
                                        line
                                    });
                                }
                                countOfOnLineReturnedTruthy++;
                            }
                            lineNumber++;

                            if (onProgress) {
                                onProgress(getStatus());
                            }

                            if (!result && abortWhenOnLineReturnsFalsy) {
                                // Clean up resources
                                rl.close();
                                fileStream.destroy();

                                if (onEnd) {
                                    onEnd();
                                }
                                resolve([null, getStatus({ aborted: true })]);
                                return;
                            }
                        }

                        if (onEnd) {
                            onEnd();
                        }
                        resolve([null, getStatus({ completed: true })]);
                    } catch (readError) {
                        if (onError) {
                            onError(readError);
                        }
                        resolve([readError, getStatus({ errored: true })]);
                    }
                })();
            } catch (setupError) {
                if (onError) {
                    onError(setupError);
                }
                resolve([setupError, getStatus({ errored: true })]);
            }
        } catch (err) {
            if (onError) {
                onError(err);
            }
            resolve([err, { errored: true }]);
        }
    });
};
