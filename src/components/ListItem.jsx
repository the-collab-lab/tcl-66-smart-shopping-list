import { updateItem } from '../api';
import { subtractDates } from '../utils';
import { Timestamp } from 'firebase/firestore';
import './ListItem.css';

export function ListItem({ name, listPath, id, dateLastPurchased }) {
	const todaysDate = Timestamp.now();

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
					id={`checkbox-${id}`} // Unique identifier
					name={name}
					onChange={handleChecked}
					checked={subtractDates(todaysDate, dateLastPurchased)}
				></input>
			</label>
		</li>
	);
}
