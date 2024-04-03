import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createList } from '../api';
import { useAuth } from '../api/useAuth.jsx';
import Button from './Button.jsx';
import TextInput from './TextInput.jsx';
import { GoPlus } from 'react-icons/go';
import capitalizeFirstLetterOfEachWord from '../utils/capitalize.js';

export default function AddList({ setListPath }) {
	const [listName, setListName] = useState('');
	const [message, setMessage] = useState('');
	const navigate = useNavigate();
	const { user } = useAuth();
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (!listName) {
				window.alert('Please enter a list name');
				return;
			}
			const newList = await createList(user.uid, user.email, listName);
			const listPath = user.uid + '/' + listName;
			// if list is created newList will be true else newList will be false
			if (newList) {
				setListName('');
				setMessage(
					`${capitalizeFirstLetterOfEachWord(listName)} was successfully created.`,
				);
				setListPath(listPath);
				setTimeout(() => {
					navigate('/list');
				}, 2000);
			} else {
				setMessage(
					`${capitalizeFirstLetterOfEachWord(listName)} was not created. Please try again.`,
				);
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
			<form
				onSubmit={handleSubmit}
				className="flex justify-center items-end flex-wrap space-x-2 gap-2"
			>
				<TextInput
					label="Create a new shopping list:"
					placeholder="add a list name"
					onChange={(e) => setListName(e.target.value)}
					value={listName}
				/>
				<Button
					type="submit"
					text="Add list"
					bgColor="bg-tcl-blue"
					textColor="text-white"
					icon={<GoPlus size={19} />}
				/>
			</form>
			{message ? <p>{message}</p> : null}
		</>
	);
}
