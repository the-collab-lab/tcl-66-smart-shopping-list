import { updateItem, uncheckItem, deleteItem } from '../api';
import {
	getDifferenceBetweenDates,
	subtractDatesForAutoUncheck,
	todaysDate,
} from '../utils';
import { calculateUrgency } from '../utils/helpers';
import { Timestamp } from 'firebase/firestore';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';
import { IoIosCheckmark } from 'react-icons/io';
import { VscTrash } from 'react-icons/vsc';
import Urgency from './Urgency';
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
		),
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

	const handleKeyPress = (e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			handleChecked();
		}
	};

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
		<li>
			<div
				htmlFor={`checkbox-${id}`}
				onClick={handleChecked}
				className={`cursor-pointer bg-white shadow hover:shadow-md xsm:h-[56px] sm:h-[72px] flex items-center justify-between rounded-lg xsm:px-4 sm:p-6 transition-shadow duration-300 ease-in-out`}
				onKeyPress={handleKeyPress}
				role="button"
				tabIndex="0"
			>
				<div className="flex gap-4 text-base">
					<div className="relative flex items-center">
						<input
							type="checkbox"
							id={`checkbox-${id}`}
							name={name}
							onChange={handleChecked}
							checked={isChecked}
							className="h-4 w-4 checked:bg-tcl-blue checked:border-0 outline-none bg-gray-50 cursor-pointer appearance-none border border-gray-300 rounded-[4px]"
							tabIndex={-1}
						/>
						{isChecked && (
							<div className="absolute top-[12px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
								<IoIosCheckmark className="text-white" size={22} />
							</div>
						)}
					</div>
					<span
						className={`cursor-pointer ${urgency === 'inactive' ? 'text-gray-400' : 'text-gray-900'}`}
					>
						{capitalizeFirstLetterOfEachWord(name)}
					</span>
				</div>
				<div className="flex items-center gap-4">
					<Urgency isChecked={isChecked} urgency={urgency} />
					<button
						onClick={handleDelete}
						className="border border-white hover:border-gray-600 rounded-sm p-[1px] pt-[2px] hover:bg-gray-100 transition-colors duration-100 ease-in-out"
					>
						<VscTrash size={20} className="text-gray-600" />
					</button>
				</div>
			</div>
		</li>
	);
}
