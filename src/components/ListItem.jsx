import { updateItem, uncheckItem } from '../api';
import { subtractDates } from '../utils';
import { Timestamp } from 'firebase/firestore';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';
import './ListItem.css';

export function ListItem({
	name,
	listPath,
	id,
	dateLastPurchased,
	dateNextPurchased,
	totalPurchases,
	dateCreated,
}) {
	const todaysDate = Timestamp.now();
	const isChecked = subtractDates(todaysDate, dateLastPurchased);

	// if dateLastPurchased is true subtract it from dateNextPurchased, else subtract dateCreated from dateNextPurchased to get the estimated number of days till next purchase
	const previousEstimate = Math.ceil(
		(dateNextPurchased && dateLastPurchased
			? dateNextPurchased.toDate() - dateLastPurchased.toDate()
			: dateNextPurchased && dateCreated
				? dateNextPurchased.toDate() - dateCreated.toDate()
				: 0) /
			(24 * 60 * 60 * 1000),
	);

	// if dateLastPurchased is true subtract it from todaysDate, else subtract dateCreated from todaysDate to get the number of days since the last transaction
	const daysSinceLastTransaction = Math.floor(
		(todaysDate.toDate() -
			(dateLastPurchased ? dateLastPurchased.toDate() : dateCreated.toDate())) /
			(24 * 60 * 60 * 1000),
	);

	const nextPurchaseEstimate = calculateEstimate(
		previousEstimate,
		daysSinceLastTransaction,
		totalPurchases,
	);

	const handleChecked = async () => {
		try {
			if (isChecked) {
				// Uncheck item
				await uncheckItem(listPath, id);
			} else {
				// Check item
				await updateItem(listPath, id, todaysDate, nextPurchaseEstimate);
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<li className="ListItem">
			<label>
				{name}
				<input
					type="checkbox"
					id={`checkbox-${id}`} // Unique identifier
					name={name}
					onChange={handleChecked}
					checked={isChecked}
				></input>
			</label>
		</li>
	);
}
