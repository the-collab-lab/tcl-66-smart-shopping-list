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
				message: "Please name your item. Heh, empty spaces don't count!",
				iconName: 'warning',
				color: 'orange',
			});
			return;
		}

		// Check if the itemName already exists in the list
		if (existingItem(newItemName)) {
			addToast({
				id: 'toastExistingItem',
				message: `All good, ${newItemName} is already in your list!`,
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
				message: `Done! ${newItemName} added to list!`,
				iconName: 'check',
				color: 'blue',
			});
			setItemValue(initialState);
			// alert(`Done! ${newItemName} added to list!`);
		} catch (err) {
			// alerts user something else went wrong
			addToast({
				id: 'toastItemAddErr',
				message: `There was an error adding ${newItemName} to your list, please try again`,
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
		</>
	);
}
