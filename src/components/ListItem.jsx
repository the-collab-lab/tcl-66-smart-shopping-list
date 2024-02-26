import './ListItem.css';

import { updateItem } from '../api';

export function ListItem({ name, listPath, id }) {
	const handleChecked = async () => {
		const todaysDate = new Date();
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
				<input type="checkbox" name={name} onClick={handleChecked}></input>
			</label>
		</li>
	);
}
