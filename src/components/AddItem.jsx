import { useState } from 'react';
import { addItem } from '../api/firebase';
import TextInput from '../components/TextInput';
import Button from './Button';
import SelectInput from './SelectInput';
import { GoPlus } from 'react-icons/go';
import { useToast } from '../utils/hooks';
import Toast from './Toast';

export default function AddItem({ listPath, data }) {
	const { toasts, addToast } = useToast();

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
		// Check that the user added the timeframe
		if (itemValue.daysUntilNextPurchase === '') {
			addToast({
				id: 'toastTimeframe',
				message: 'Eeep, select a time frame to add an item to your list!',
				iconName: 'warning',
				color: 'orange',
			});
			return;
		}
		// Check if the itemName is empty
		if (newItemName === '') {
			addToast({
				id: 'toastEmptyName',
				message: "Please name your item. Empty spaces don't count!",
				iconName: 'warning',
				color: 'orange',
			});
			return;
		}

		// Check if the itemName already exists in the list
		if (existingItem(newItemName)) {
			addToast({
				id: 'toastExistingItem',
				message: 'Uh oh, this item is already in your list!',
				iconName: 'error',
				color: 'red',
			});
			return;
		}

		try {
			// adds item after checks pass
			await addItem(listPath, itemValue);
			addToast({
				id: 'toastItemAdded',
				message: `${newItemName} added to list!`,
				iconName: 'check',
				color: 'blue',
			});
			setItemValue(initialState);
		} catch (err) {
			// alerts user something else went wrong
			addToast({
				id: 'toastItemAddError',
				message: `There was an error adding ${newItemName} to list, please try again`,
				iconName: 'error',
				color: 'red',
			});
			console.error(err);
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
		<>
			{toasts.map((toast) => (
				<Toast key={toast.id} {...toast} />
			))}
			<form
				onSubmit={handleSubmit}
				className="flex items-end flex-wrap gap-4 w-full"
			>
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
			</form>
		</>
	);
}
