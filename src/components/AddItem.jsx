import { useState } from 'react';
import { addItem } from '../api/firebase';

export default function AddItem({ listPath, data }) {
	const initialState = {
		itemName: '',
		daysUntilNextPurchase: 0,
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

		// Check if the itemName is empty
		if (newItemName === '') {
			alert(`Error: please name your item. Empty spaces don't count!`);
			return;
		}

		// Check if the itemName already exists in the list
		if (existingItem(newItemName)) {
			alert('Error: This item is already in your list!');
			return;
		}

		try {
			await addItem(listPath, itemValue);
			alert('Item added!');
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
		<form onSubmit={handleSubmit}>
			<label>
				Item name:
				<input
					type="text"
					name="itemName"
					onChange={handleInputChange}
					value={itemValue.itemName}
				/>
			</label>
			<label>
				Timeframe:
				<select
					name="daysUntilNextPurchase"
					onChange={handleInputChange}
					value={itemValue.daysUntilNextPurchase}
				>
					<option value="" default>
						--Select an option--
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
