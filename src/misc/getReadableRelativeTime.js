const arrMonths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

// FIXME: If this code is running at server side, then the timezone can be different from the client side. Extend this
//        function to accept the timezone as a parameter.
const getReadableRelativeTime = function (timestamp) {
    const now = new Date();
    const dateForTimestamp = new Date(timestamp);

    // @ts-ignore
    let diffInMs = now - timestamp;
    if (diffInMs >= 0) {
        // do nothing
    } else {
        diffInMs = -1;
    }

    const
        timeDiffInSeconds = diffInMs          / 1000,
        timeDiffInMinutes = timeDiffInSeconds /   60,
        timeDiffInHours   = timeDiffInMinutes /   60,
        timeDiffInDays    = timeDiffInHours   /   24,
        timeDiffInWeeks   = timeDiffInDays    /    7;

    let relativeTime;
    if (timeDiffInDays >= 364) {
        relativeTime = dateForTimestamp.getDate() + ' ' + arrMonths[dateForTimestamp.getMonth()] + ' ' + dateForTimestamp.getFullYear();
    } else if (timeDiffInWeeks >= 5) {
        relativeTime = dateForTimestamp.getDate() + ' ' + arrMonths[dateForTimestamp.getMonth()];
    } else if (timeDiffInWeeks   >= 1) { relativeTime = Math.floor(timeDiffInWeeks  ) + 'w';
    } else if (timeDiffInDays    >= 1) { relativeTime = Math.floor(timeDiffInDays   ) + 'd';
    } else if (timeDiffInHours   >= 1) { relativeTime = Math.floor(timeDiffInHours  ) + 'h';
    } else if (timeDiffInMinutes >= 1) { relativeTime = Math.floor(timeDiffInMinutes) + 'm';
    } else if (timeDiffInSeconds >= 1) { relativeTime = Math.floor(timeDiffInSeconds) + 's';
    } else if (timeDiffInSeconds >= 0) { relativeTime = 'Just now';
    } else {
        relativeTime = dateForTimestamp.getDate() + ' ' + arrMonths[dateForTimestamp.getMonth()] + ' ' + dateForTimestamp.getFullYear();
    }

    return relativeTime;
};

export { getReadableRelativeTime };
