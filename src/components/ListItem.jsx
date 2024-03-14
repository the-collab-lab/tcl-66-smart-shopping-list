import { updateItem } from '../api';
import { getDifferenceBetweenDates, todaysDate } from '../utils';
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

	let urgency;
	if (
		daysTillNextPurchase < 0 &&
		daysSinceLastPurchase > daysTillNextPurchase
	) {
		urgency = 'overdue';
	} else if (daysTillNextPurchase <= 7) {
		urgency = 'soon';
	} else if (daysTillNextPurchase < 30) {
		urgency = 'kind of soon';
	} else if (daysTillNextPurchase >= 30) {
		urgency = 'not so soon';
	}

	if (daysSinceLastPurchase >= 60) {
		urgency = 'inactive';
	}

	let textColor = '';
	switch (urgency) {
		case 'overdue':
			textColor = 'red';
			break;
		case 'soon':
			textColor = 'orange';
			break;
		case 'kind of soon':
			textColor = 'yellow';
			break;
		case 'not so soon':
			textColor = 'green';
			break;
		case 'inactive':
			textColor = 'grey';
			break;
		default:
			textColor = 'black';
	}

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
