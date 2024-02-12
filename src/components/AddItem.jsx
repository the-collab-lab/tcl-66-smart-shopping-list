import { useState } from 'react';
import { addItem } from '../api/firebase';

export default function AddItem({ listPath }) {
	const [itemValue, setItemValue] = useState({
		name: '',
		daysUntilNextPurchase: 0,
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		const res = addItem(listPath, itemValue);
		console.log(listPath);
		console.log(res);
		// try {
		// 	// alert('Item added!');
		// } catch (err) {
		// 	alert('Error adding item to database');
		// }
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
					name="name"
					onChange={handleInputChange}
					value={itemValue.name}
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
