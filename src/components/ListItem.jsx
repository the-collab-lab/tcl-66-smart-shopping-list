import { getDifferenceBetweenDates, todaysDate } from '../utils';
import { colorPicker, calculateUrgency } from '../utils/helpers';
import { updateItem, deleteItem } from '../api';
import { Timestamp } from 'firebase/firestore';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';
import { IoTrashOutline as TrashIcon } from 'react-icons/io5';

// import './ListItem.css';

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
		<li className="flex flex-grow items-center justify-between px-6 h-12 bg-white rounded-lg shadow-sm mt-4">
			<input
				type="checkbox"
				className="rounded-sm border-none bg-gray-400"
				id={`checkbox-${id}`} // Unique identifier
				name={name}
				onChange={handleChecked}
				checked={isChecked()}
			></input>
			<label className="flex px-2 items-center w-full h-full">{name}</label>
			<span className={`px-2 py-1 mx-2 rounded-lg min-w-fit bg-${textColor}`}>
				{urgency}
			</span>
			<button onClick={handleDelete} className="delete-button">
				<TrashIcon />
			</button>
		</li>
	);
}
