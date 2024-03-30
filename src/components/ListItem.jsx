import { updateItem, uncheckItem, deleteItem } from '../api';
import {
	getDifferenceBetweenDates,
	subtractDatesForAutoUncheck,
	todaysDate,
} from '../utils';
import { colorPicker, calculateUrgency } from '../utils/helpers';
import { Timestamp } from 'firebase/firestore';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';
import { IoTrashOutline as TrashIcon } from 'react-icons/io5';
import capitalizeFirstLetterOfEachWord from '../utils/capitalize';

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
		'flex flex-grow items-center justify-between px-6 h-14 bg-checkedItem rounded-lg shadow-sm mt-4 xsm:text-xs sm:text-sm hover:bg-gray-100 hover:bg-opacity-85';
	const uncheckedItemStyle =
		'flex flex-grow items-center justify-between px-6 h-14 bg-item rounded-lg shadow-sm mt-4 xsm:text-xs sm:text-sm hover:bg-gray-100 hover:bg-opacity-85';

	const tagColor = !isChecked ? textColor : '#9CA3AF';

	const handleDelete = async () => {
		try {
			if (
				window.confirm(
					`Are you sure you want to delete ${capitalizeFirstLetterOfEachWord(name)} ?`,
				)
			) {
				await deleteItem(listPath, id);
			} else {
				return;
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<li className={isChecked ? checkedItemStyle : uncheckedItemStyle}>
			<input
				type="checkbox"
				id={`checkbox-${id}`} // Unique identifier
				name={name}
				onChange={handleChecked}
				checked={isChecked}
			></input>
			<label className="flex px-2 items-center w-full h-full text-lg xsm:text-xs sm:text-sm">
				{capitalizeFirstLetterOfEachWord(name)}
			</label>
			<span
				className={`px-2 py-1 mx-2 rounded-lg min-w-fit`}
				style={{ backgroundColor: tagColor }}
			>
				{!isChecked ? urgency : 'checked'}
			</span>
			<button onClick={handleDelete} className="delete-button">
				<TrashIcon />
			</button>
		</li>
	);
}
