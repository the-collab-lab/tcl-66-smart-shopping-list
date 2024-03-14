import { updateItem } from '../api';
import { getDifferenceBetweenDates, todaysDate } from '../utils';
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
	totalPurchases,
	dateCreated,
}) {
	// if dateLastPurchased is true subtract it from dateNextPurchased, else subtract dateCreated from dateNextPurchased to get the estimated number of days till next purchase
	const previousEstimate = Math.ceil(
		getDifferenceBetweenDates(
			dateNextPurchased.toDate(),
			dateLastPurchased ? dateLastPurchased.toDate() : dateCreated.toDate(),
		),
	);

	// if dateLastPurchased is true subtract it from todaysDate, else subtract dateCreated from todaysDate to get the number of days since the last transaction
	const daysSinceLastPurchase = Math.floor(
		getDifferenceBetweenDates(
			todaysDate,
			dateLastPurchased ? dateLastPurchased.toDate() : dateCreated.toDate(),
		),
	);

	const daysTillNextPurchase = Math.floor(
		Math.floor(
			getDifferenceBetweenDates(dateNextPurchased.toDate(), todaysDate),
		),
	);

	const nextPurchaseEstimate = calculateEstimate(
		previousEstimate,
		daysSinceLastPurchase,
		totalPurchases,
	);

	const handleChecked = async () => {
		const todaysDateTimestamp = Timestamp.now();
		try {
			await updateItem(listPath, id, todaysDateTimestamp, nextPurchaseEstimate);
		} catch (err) {
			console.error(err);
		}
	};

	const isChecked = () => {
		if (dateLastPurchased) {
			return (
				getDifferenceBetweenDates(todaysDate, dateLastPurchased.toDate()) < 1
			);
		}

		return false;
	};

	let urgency = calculateUrgency(daysTillNextPurchase, daysSinceLastPurchase);
	let textColor = colorPicker(urgency);

	return (
		<li className="ListItem">
			<label>
				{name} <span style={{ color: textColor }}>{urgency}</span>
				<input
					type="checkbox"
					id={`checkbox-${id}`} // Unique identifier
					name={name}
					onChange={handleChecked}
					checked={isChecked()}
				></input>
			</label>
		</li>
	);
}
