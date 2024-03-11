import { useState } from 'react';
import { updateItem, undoItem } from '../api';
import { subtractDates } from '../utils';
import { Timestamp } from 'firebase/firestore';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';
import './ListItem.css';

export function ListItem({
	name,
	listPath,
	id,
	previousLastPurchased,
	previousNextPurchased,
	dateLastPurchased,
	dateNextPurchased,
	totalPurchases,
	dateCreated,
}) {
	const [showUndoButton, setShowUndoButton] = useState(false);
	const todaysDate = Timestamp.now();

	// if dateLastPurchased is true subtract it from dateNextPurchased, else subtract dateCreated from dateNextPurchased to get the estimated number of days till next purchase
	const previousEstimate = Math.ceil(
		(dateNextPurchased.toDate() -
			(dateLastPurchased ? dateLastPurchased.toDate() : dateCreated.toDate())) /
			(24 * 60 * 60 * 1000),
	);

	// if dateLastPurchased is true subtract it from todaysDate, else subtract dateCreated from todaysDate to get the number of days since the last transaction
	const daysSinceLastTransaction = Math.floor(
		(todaysDate.toDate() -
			(dateLastPurchased ? dateLastPurchased.toDate() : dateCreated.toDate())) /
			(24 * 60 * 60 * 1000),
	);

	const nextPurchaseEstimate = calculateEstimate(
		previousEstimate,
		daysSinceLastTransaction,
		totalPurchases,
	);

	const handleChecked = async () => {
		setShowUndoButton(true);
		if (subtractDates(todaysDate, dateLastPurchased)) {
			alert('Item is already checked');
			return;
		}

		try {
			await updateItem(
				listPath,
				id,
				todaysDate,
				dateLastPurchased,
				dateNextPurchased,
				nextPurchaseEstimate,
			);
		} catch (err) {
			console.error(err);
		}
	};

	const handleUndo = async () => {
		try {
			await undoItem(
				listPath,
				id,
				previousLastPurchased,
				previousNextPurchased,
			);
		} catch (err) {
			console.error(err);
		}
	};

	const handleFocus = () => {
		setShowUndoButton(subtractDates(todaysDate, dateLastPurchased));
	};

	const handleBlur = () => {
		setShowUndoButton(false);
	};

	const handleMouseEnter = () => {
		setShowUndoButton(subtractDates(todaysDate, dateLastPurchased));
	};

	const handleMouseLeave = () => {
		setShowUndoButton(false);
	};

	return (
		<li
			className="ListItem"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<label>
				{name}
				<input
					type="checkbox"
					id={`checkbox-${id}`}
					name={name}
					onChange={handleChecked}
					onFocus={handleFocus}
					checked={subtractDates(todaysDate, dateLastPurchased)}
				></input>
			</label>
			{showUndoButton && (
				<button
					className="toggle-undo"
					onClick={handleUndo}
					onBlur={handleBlur}
				>
					undo
				</button>
			)}
		</li>
	);
}
