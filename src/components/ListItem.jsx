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
	previousLastPurchased,
	previousNextPurchased,
	totalPurchases,
	dateCreated,
}) {
	const todaysDate = Timestamp.now();
	const isChecked = subtractDates(todaysDate, dateLastPurchased);

	// Calculate the previous estimate based on the last purchase date or creation date
	const previousEstimate = Math.ceil(
		(dateNextPurchased instanceof Timestamp && dateLastPurchased
			? dateNextPurchased.toDate() - dateLastPurchased.toDate()
			: dateNextPurchased instanceof Timestamp && dateCreated
				? dateNextPurchased.toDate() - dateCreated.toDate()
				: 0) /
			(24 * 60 * 60 * 1000),
	);

	// Calculate the number of days since the last transaction
	const daysSinceLastTransaction = Math.floor(
		(todaysDate.toDate() -
			(dateLastPurchased instanceof Timestamp
				? dateLastPurchased.toDate()
				: dateCreated.toDate())) /
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
				await uncheckItem(
					listPath,
					id,
					previousLastPurchased,
					previousNextPurchased,
				);
			} else {
				// Check item
				await updateItem(
					listPath,
					id,
					todaysDate,
					dateLastPurchased,
					dateNextPurchased,
					nextPurchaseEstimate,
				);
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
