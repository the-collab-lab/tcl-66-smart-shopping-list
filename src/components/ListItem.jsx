import { updateItem, uncheckItem, deleteItem } from '../api';
import {
	getDifferenceBetweenDates,
	subtractDatesForAutoUncheck,
	todaysDate,
} from '../utils';
import { colorPicker, calculateUrgency } from '../utils/helpers';
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
	const todaysDateTimestamp = Timestamp.now();
	const isChecked = subtractDatesForAutoUncheck(
		todaysDateTimestamp,
		dateLastPurchased,
	);

	// Calculate the previous estimate based on the last purchase date or creation date
	const previousEstimate = Math.ceil(
		getDifferenceBetweenDates(
			dateNextPurchased.toDate(),
			dateLastPurchased ? dateLastPurchased.toDate() : dateCreated.toDate(),
		),
	);

	// Calculate the number of days since the last transaction
	const daysSinceLastPurchase = Math.floor(
		getDifferenceBetweenDates(
			todaysDate,
			dateLastPurchased ? dateLastPurchased.toDate() : dateCreated.toDate(),
		) /
			(24 * 60 * 60 * 1000),
	);

	const daysTillNextPurchase = Math.floor(
		getDifferenceBetweenDates(dateNextPurchased.toDate(), todaysDate),
	);

	const nextPurchaseEstimate = calculateEstimate(
		previousEstimate,
		daysSinceLastPurchase,
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
					totalPurchases,
				);
			} else {
				// Check item
				await updateItem(
					listPath,
					id,
					todaysDateTimestamp,
					dateLastPurchased,
					dateNextPurchased,
					nextPurchaseEstimate,
				);
			}
		} catch (err) {
			console.error(err);
		}
	};

	let urgency = calculateUrgency(daysTillNextPurchase, daysSinceLastPurchase);
	let textColor = colorPicker(urgency);

	const handleDelete = async () => {
		try {
			if (window.confirm('Are you sure you want to delete this item?')) {
				await deleteItem(listPath, id);
			} else {
				return;
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<li className="ListItem">
			<label>
				{name} <span style={{ color: textColor }}>{urgency}</span>
				<input
					type="checkbox"
					id={`checkbox-${id}`} // Unique identifier
					name={name}
					onChange={handleChecked}
					checked={isChecked}
				></input>
			</label>
			<button onClick={handleDelete} className="delete-button">
				Delete
			</button>
		</li>
	);
}
