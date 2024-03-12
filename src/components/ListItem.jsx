import { updateItem } from '../api';
import { getDifferenceBetweenDates } from '../utils';
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

	// if dateLastPurchased is true subtract it from dateNextPurchased, else subtract dateCreated from dateNextPurchased to get the estimated number of days till next purchase
	const previousEstimate = Math.ceil(
		getDifferenceBetweenDates(
			dateNextPurchased.toDate(),
			dateLastPurchased ? dateLastPurchased.toDate() : dateCreated.toDate(),
		),
	);

	// if dateLastPurchased is true subtract it from todaysDate, else subtract dateCreated from todaysDate to get the number of days since the last transaction
	const daysSinceLastTransaction = Math.floor(
		getDifferenceBetweenDates(
			todaysDate.toDate(),
			dateLastPurchased ? dateLastPurchased.toDate() : dateCreated.toDate(),
		),
	);

	const daysTillNextPurchase = Math.floor(
		Math.floor(
			getDifferenceBetweenDates(
				dateNextPurchased.toDate(),
				todaysDate.toDate(),
			),
		),
	);

	const nextPurchaseEstimate = calculateEstimate(
		previousEstimate,
		daysSinceLastTransaction,
		totalPurchases,
	);

	const handleChecked = async () => {
		try {
			await updateItem(listPath, id, todaysDate, nextPurchaseEstimate);
		} catch (err) {
			console.error(err);
		}
	};

	const isChecked = () => {
		if (dateLastPurchased) {
			return (
				getDifferenceBetweenDates(
					todaysDate.toDate(),
					dateLastPurchased.toDate(),
				) < 1
			);
		}

		return false;
	};

	let urgency;
	if (daysTillNextPurchase < 0) {
		urgency = 'overdue';
	} else if (daysTillNextPurchase <= 7) {
		urgency = 'soon';
	} else if (daysTillNextPurchase <= 30) {
		urgency = 'kind of soon';
	} else {
		urgency = 'not so soon';
	}

	if (daysSinceLastTransaction >= 60) {
		urgency = 'inactive';
	}

	return (
		<li className="ListItem">
			<label>
				{name}{' '}
				{Math.floor(
					getDifferenceBetweenDates(
						dateNextPurchased.toDate(),
						todaysDate.toDate(),
					),
				)}{' '}
				<span style={{ color: 'grey' }}>{urgency}</span>
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
