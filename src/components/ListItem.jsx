import { updateItem, uncheckItem, deleteItem } from '../api';
import {
	getDifferenceBetweenDates,
	subtractDatesForAutoUncheck,
	todaysDate,
} from '../utils';
import './ListItem.css';
import { colorPicker, calculateUrgency } from '../utils/helpers';
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

	const checkedItemStyle =
		'strikethrough flex px-2 items-center w-full h-full text-lg xsm:text-xs sm:text-sm';
	const uncheckedItemStyle =
		'flex px-2 items-center w-full h-full text-lg xsm:text-xs sm:text-sm';

	const capitalizeFirstLetterOfEachWord = (str) => {
		// Split the string into words
		const words = str.toLowerCase().split(' ');

		// Capitalize the first letter of each word
		const capitalizedWords = words.map((word) => {
			return word.charAt(0).toUpperCase() + word.slice(1);
		});

		// Join the words back into a single string
		return capitalizedWords.join(' ');
	};

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
		<li className="flex flex-grow items-center justify-between px-6 h-14 bg-white rounded-lg shadow-sm mt-4 xsm:text-xs sm:text-sm">
			<input
				type="checkbox"
				id={`checkbox-${id}`} // Unique identifier
				name={name}
				onChange={handleChecked}
				checked={isChecked}
			></input>
			<label className={isChecked ? checkedItemStyle : uncheckedItemStyle}>
				{capitalizeFirstLetterOfEachWord(name)}
			</label>
			<span
				className={`px-2 py-1 mx-2 rounded-lg min-w-fit`}
				style={{ backgroundColor: textColor }}
			>
				{urgency}
			</span>
			<button onClick={handleDelete} className="delete-button">
				<TrashIcon />
			</button>
		</li>
	);
}
