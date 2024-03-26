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
	const millisecondsDifference = date1 - date2;
	const hoursDifference = millisecondsDifference / (1000 * 60 * 60); // Convert milliseconds to hours

	if (date1.getDate() === date2.getDate() && Math.abs(hoursDifference) < 24) {
		return 0; // If dates are within 24 hours on the same day, return 0
	}
	return millisecondsDifference / ONE_DAY_IN_MILLISECONDS;
}

export function subtractDatesForAutoUncheck(todaysDate, dateLastPurchased) {
	if (dateLastPurchased) {
		return (todaysDate - dateLastPurchased) * 1000 < ONE_DAY_IN_MILLISECONDS;
	}

	return false;
}

export const todaysDate = new Date();
