import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { readFileLineByLineAsync } from './readFileLineByLineAsync.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sampleFilePath = path.resolve(__dirname, 'readFileLineByLineAsync.sample.js');

// Example 1: Basic usage
const basicExample = async () => {
    console.log('\n--- Example 1: Basic Usage ---');
    const [error, status] = await readFileLineByLineAsync({
        filePath: sampleFilePath,
        onLine: (line) => {
            console.log(`Basic: ${line}`);
            return true;
        }
    });

    if (error) {
        console.error('Error reading file:', error);
    } else {
        console.log('File read complete:', status);
    }
};

// Example 2: Using all callbacks
const callbacksExample = async () => {
    console.log('\n--- Example 2: Using All Callbacks ---');
    const [error, status] = await readFileLineByLineAsync({
        filePath: sampleFilePath,
        onBegin: () => {
            console.log('Starting to read file...');
        },
        onLine: (line, lineNumber) => {
            console.log(`Line ${lineNumber}: ${line.substring(0, 40)}${line.length > 40 ? '...' : ''}`);
            return true;
        },
        onProgress: (status) => {
            if (status.lastLineNumberRead % 10 === 0) {
                console.log(`Progress: Read ${status.lastLineNumberRead} lines, processed ${status.countOfOnLineReturnedTruthy}`);
            }
        },
        onError: (err) => {
            console.error('An error occurred while reading:', err);
        },
        onEnd: () => {
            console.log('Finished reading file.');
        }
    });

    console.log('Final status:', status);
};

// Example 3: Filtering lines
const filteringExample = async () => {
    console.log('\n--- Example 3: Filtering Lines ---');
    const [error, status] = await readFileLineByLineAsync({
        filePath: sampleFilePath,
        onLine: (line) => {
            // Only process lines containing 'import'
            return line.includes('import');
        },
        filterWhenOnLineReturnsTruthy: true,
        onProgress: (status) => {
            console.log(`Filtered ${status.countOfOnLineReturnedTruthy} lines containing 'import'`);
        }
    });

    console.log('Filtering complete. Processed:', status.countOfOnLineReturnedTruthy, 'lines');
    console.log('Filtered results:', status.filteredResults);
};

// Example 4: Early termination
const earlyTerminationExample = async () => {
    console.log('\n--- Example 4: Early Termination ---');
    let lineCount = 0;

    const [error, status] = await readFileLineByLineAsync({
        filePath: sampleFilePath,
        onLine: (line, lineNumber) => {
            lineCount++;
            console.log(`Line ${lineNumber}: ${line.substring(0, 40)}${line.length > 40 ? '...' : ''}`);

            // Stop after reading 5 lines by returning false
            if (lineCount >= 5) {
                console.log('Reached 5 lines, stopping early...');
                return false;
            }
            return true;
        },
        abortWhenOnLineReturnsFalsy: true,
        onEnd: () => {
            console.log('File reading aborted after 5 lines.');
        }
    });

    console.log('Early termination status:', status);
    if (status.aborted) {
        console.log('File reading was aborted as expected.');
    }
};

// Example 5: Checking status.aborted in various scenarios
const checkAbortedStatusExample = async () => {
    console.log('\n--- Example 5: Checking Status Flags ---');

    // Case 1: Normal completion (completed should be true, aborted and errored should be undefined/false)
    console.log('Case 1: Normal completion');
    let [error, status] = await readFileLineByLineAsync({
        filePath: sampleFilePath,
        onLine: () => true, // Always return true to process all lines
        onEnd: () => console.log('Normal file reading completed')
    });
    console.log('Status after normal completion:', status);
    console.log('Status flags:', {
        completed: status.completed ? 'true' : 'false/undefined',
        aborted: status.aborted ? 'true' : 'false/undefined',
        errored: status.errored ? 'true' : 'false/undefined'
    });

    // Case 2: Aborted reading
    console.log('\nCase 2: Aborted reading');
    let count = 0;
    [error, status] = await readFileLineByLineAsync({
        filePath: sampleFilePath,
        onLine: () => {
            count++;
            return count < 3; // Return false after reading 2 lines
        },
        abortWhenOnLineReturnsFalsy: true,
        onEnd: () => console.log('Aborted file reading completed')
    });
    console.log('Status after aborted reading:', status);
    console.log('Status flags:', {
        completed: status.completed ? 'true' : 'false/undefined',
        aborted: status.aborted ? 'true' : 'false/undefined',
        errored: status.errored ? 'true' : 'false/undefined'
    });

    // Case 3: Error scenario (will be simulated)
    console.log('\nCase 3: Error scenario (simulated)');
    try {
        // Create a non-existent file path to trigger an error
        const nonExistentFile = path.resolve(__dirname, 'non_existent_file.txt');
        [error, status] = await readFileLineByLineAsync({
            filePath: nonExistentFile,
            onLine: () => true,
            onError: (err) => console.log('Error occurred:', err.message)
        });
        console.log('Status after error:', status);
        console.log('Status flags:', {
            completed: status.completed ? 'true' : 'false/undefined',
            aborted: status.aborted ? 'true' : 'false/undefined',
            errored: status.errored ? 'true' : 'false/undefined'
        });
    } catch (err) {
        console.error('Unexpected error:', err);
    }
};

// Run all examples
const main = async () => {
    try {
        await basicExample();
        await callbacksExample();
        await filteringExample();
        await earlyTerminationExample();
        await checkAbortedStatusExample();
    } catch (err) {
        console.error('Error running examples:', err);
    }
};

main();
