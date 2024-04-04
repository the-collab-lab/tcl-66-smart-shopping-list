import { useState } from 'react';
import { addItem } from '../api/firebase';
import TextInput from '../components/TextInput';
import Button from './Button';
import SelectInput from './SelectInput';
import { GoPlus } from 'react-icons/go';

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
		<form onSubmit={handleSubmit}>
			<div className="flex items-end flex-wrap xsm:justify-center sm:justify-normal xsm:gap-2 sm:gap-4 w-full xsm:mb-4">
				<TextInput
					label="Add item"
					name="itemName"
					placeholder="Add item to list"
					onChange={handleInputChange}
					value={itemValue.itemName}
				/>
				<SelectInput
					label="Timeframe"
					id="timeframe"
					name="daysUntilNextPurchase"
					value={itemValue.daysUntilNextPurchase}
					onChange={handleInputChange}
				/>
				<Button
					type="submit"
					text="Add item"
					bgColor="bg-tcl-blue"
					textColor="text-white"
					icon={<GoPlus size={19} />}
				/>
			</div>
		</form>
	);
}
