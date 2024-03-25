import { useState } from 'react';
import { addItem } from '../api/firebase';

export default function AddItem({ listPath, data }) {
	const initialState = {
		itemName: '',
		daysUntilNextPurchase: '',
	};

	const [itemValue, setItemValue] = useState(initialState);

	const normalizedItemName = (str) => {
		return str.toLowerCase().replace(/[^\w\s]|(\s+)/g, '');
	};

	const existingItem = (newItemName) => {
		return data.some(
			(item) =>
				normalizedItemName(item.name) === normalizedItemName(newItemName),
		);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newItemName = itemValue.itemName.trim();

		if (itemValue.daysUntilNextPurchase === '') {
			alert('Please select a timeframe to add item to list!');
			return;
		}
		// Check if the itemName is empty
		if (newItemName === '') {
			alert(`Please name your item. Empty spaces don't count!`);
			return;
		}

		// Check if the itemName already exists in the list
		if (existingItem(newItemName)) {
			alert('Uh oh, this item is already in your list!');
			return;
		}

		try {
			await addItem(listPath, itemValue);
			alert(`${newItemName} added to list!`);
			setItemValue(initialState);
		} catch (err) {
			alert('Error adding item to database');
		}
	};

	const handleInputChange = (e) => {
		const { value, name, type } = e.target;
		setItemValue((prevState) => ({
			...prevState,
			[name]: type === 'select-one' ? parseInt(value) : value,
		}));
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="items-center mb-2 xsm:text-xs sm:text-sm md:text-md"
		>
			<label>
				Item name:
				<input
					type="text"
					name="itemName"
					placeholder={`e.g. coffee`}
					className="border border-gray-500 p-2 rounded-lg ml-2 mb-2 xsm:max-w-full xsm:h-6 sm:max-w-full sm:h-6 md:w-56 md:h-8 "
					onChange={handleInputChange}
					value={itemValue.itemName}
				/>
			</label>
			<br />
			<label>
				Timeframe:
				<select
					name="daysUntilNextPurchase"
					onChange={handleInputChange}
					defaultValue={''}
					className="border border-gray-500 px-1 rounded-lg mx-2 xsm:max-w-full xsm:h-6 sm:max-w-full sm:h-6 md:w-36 md:h-8"
				>
					<option value="" disabled>
						Select an option
					</option>
					<option value="7">Soon</option>
					<option value="14">Kind of Soon</option>
					<option value="30">Not so Soon</option>
				</select>
			</label>
			<button type="submit">Add item</button>
		</form>
	);
}
