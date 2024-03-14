export const ONE_DAY_IN_MILLISECONDS = 86400000;

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

export function getDifferenceBetweenDates(date1, date2) {
	return (date1 - date2) / ONE_DAY_IN_MILLISECONDS;
}

// Function for unchecking item after a day has passed
export function subtractDatesForAutoUncheck(todaysDate, dateLastPurchased) {
	if (dateLastPurchased) {
		return (todaysDate - dateLastPurchased) * 1000 < ONE_DAY_IN_MILLISECONDS;
	}

	return false;
}

export const todaysDate = new Date();
