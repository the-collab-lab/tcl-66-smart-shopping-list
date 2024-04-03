import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { createList } from '../api';
import { useAuth } from '../api/useAuth.jsx';
import { useToast } from '../utils/hooks.js';
import Button from './Button.jsx';
import TextInput from './TextInput.jsx';
import Toast from './Toast';

export default function AddList({ setListPath }) {
	const [listName, setListName] = useState('');
	const navigate = useNavigate();
	const { user } = useAuth();
	const { toasts, addToast } = useToast();
  
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (!listName) {
				addToast({
					id: 'noListName',
					message: 'Please name your list',
					iconName: 'warning',
					color: 'orange',
				});
				return;
			}
			const newList = await createList(user.uid, user.email, listName);
			const listPath = user.uid + '/' + listName;
			// if list is created newList will be true else newList will be false
			if (newList) {
				setListName('');
				addToast({
					id: 'newListCreated',
					message: `Your list, ${listName}, was successfully created.`,
					iconName: 'check',
					color: 'blue',
				});
				setListPath(listPath);
				setTimeout(() => {
					navigate('/list');
				}, 2000);
			} else {
				addToast({
					id: 'problemCreatingList',
					message: `Eeep, ${listName} list was not created. Please try again.`,
					iconName: 'error',
					color: 'red',
				});
			}
		} catch (err) {
			console.error(err);
			addToast({
				id: 'errorCreatingList',
				message: `An error occurred while creating your list, ${listName}: ${err.message}.`,
				iconName: 'error',
				color: 'red',
			});
		}
	};
	return (
		<>
			{toasts.map((toast) => (
				<Toast key={toast.id} {...toast} />
			))}
			<form
				onSubmit={handleSubmit}
				className="flex items-end flex-wrap space-x-2"
			>
				<TextInput
					label="Create a new shopping list:"
					placeholder="add a list name"
					onChange={(e) => setListName(e.target.value)}
					value={listName}
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
