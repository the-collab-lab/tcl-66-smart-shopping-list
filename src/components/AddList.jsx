import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createList } from '../api';
import { useAuth } from '../api/useAuth.jsx';

export default function AddList({ setListPath }) {
	const [listName, setListName] = useState('');
	const [message, setMessage] = useState('');
	const navigate = useNavigate();
	const { user } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const newList = await createList(user.uid, user.email, listName);
			const listPath = user.uid + '/' + listName;
			// if list is created newList will be true else newList will be false

			if (newList) {
				setListName('');
				setMessage(`Your list, ${listName}, was successfully created.`);
				setListPath(listPath);
				setTimeout(() => {
					navigate('/list');
				}, 2000);
			} else {
				setMessage(`Your list, ${listName} was not created. Please try again.`);
			}
		} catch (err) {
			console.error(err);
			setMessage(
				`An error occurred while creating your list, ${listName}: ${err.message}.`,
			);
		}
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<label htmlFor="newList">Create a new shopping list:</label>
				<input
					type="text"
					id="newList"
					placeholder={`e.g. Groceries, Clothes`}
					onChange={(e) => setListName(e.target.value)}
					className="border border-gray-500 px-1 rounded-lg xsm:max-w-full xsm:ml-0 md:ml-2 lg:w-56 h-8 mx-2"
				></input>
				<button type="submit">Create List</button>
			</form>
			{message ? <p>{message}</p> : null}
		</>
	);
}
