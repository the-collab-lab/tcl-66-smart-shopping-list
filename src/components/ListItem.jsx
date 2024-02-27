import { updateItem } from '../api';
import { subtractDates } from '../utils';
import './ListItem.css';

export function ListItem({ name, listPath, id, dateLastPurchased }) {
	const todaysDate = new Date();

	const handleChecked = async () => {
		try {
			await updateItem(listPath, id, todaysDate);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<li className="ListItem">
			<label>
				{name}
				<input
					type="checkbox"
					name={name}
					onChange={handleChecked}
					checked={subtractDates(todaysDate, dateLastPurchased)}
				></input>
			</label>
		</li>
	);
}
