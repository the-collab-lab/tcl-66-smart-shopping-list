const ONE_DAY_IN_MILLISECONDS = 86400000;

/**
 * Get a new JavaScript Date that is `offset` days in the future.
 * @example
 * // Returns a Date 3 days in the future
 * getFutureDate(3)
 * @param {number} offset
 */
export function getFutureDate(offset) {
	return new Date(Date.now() + offset * ONE_DAY_IN_MILLISECONDS);
}

function convertTimestamp(timestamp) {
	if (timestamp) {
		const { seconds, nanoseconds } = timestamp;

		const timestampInMilliseconds = seconds * 1000 + nanoseconds / 1e9;

		return timestampInMilliseconds;
	}
}

export function subtractDates(todaysDate, dateLastPurchased) {
	if (dateLastPurchased) {
		const dateForCompare = convertTimestamp(dateLastPurchased);

		return todaysDate.getTime() - dateForCompare < ONE_DAY_IN_MILLISECONDS;
	}
	return false;
}
