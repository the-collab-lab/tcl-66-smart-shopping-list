import { updateItem } from '../api';
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

	// if dateLastPurchased is true subtract it from dateNextPurchased, else subtract dateCreated from dateNextPurchased to get the estimated number of days till next purchase
	// const previousEstimate = Math.ceil(
	// 	(dateNextPurchased.toMillis() -
	// 		(dateLastPurchased
	// 			? dateLastPurchased.toMillis()
	// 			: dateCreated.toMillis())) /
	// 		(1000 * 60 * 60 * 24),
	// );

	// if dateLastPurchased is true subtract it from todaysDate, else subtract dateCreated from todaysDate to get the number of days since the last transaction
	const daysSinceLastTransaction = Math.floor(
		(todaysDate.toMillis() -
			(dateLastPurchased
				? dateLastPurchased.toMillis()
				: dateCreated.toMillis())) /
			(1000 * 60 * 60 * 24),
	);

	const nextPurchase = calculateEstimate(
		14,
		daysSinceLastTransaction,
		totalPurchases,
	);
	console.log(nextPurchase);

	const handleChecked = async () => {
		try {
			await updateItem(listPath, id, todaysDate);
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
					checked={subtractDates(todaysDate, dateLastPurchased)}
				></input>
			</label>
		</li>
	);
}
